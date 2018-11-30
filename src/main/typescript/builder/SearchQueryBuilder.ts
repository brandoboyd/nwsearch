import {ISearchQueryBuilder} from './ISearchQueryBuilder';
import {Bodybuilder} from 'bodybuilder';
import {SOLD_VEHICLE_STATUS} from './SoldVehicleStatus';

/**
 * Class SearchQueryBuilder
 *
 * This class uses the Builder design pattern to build ElasticSearch query strings for New Wave Search
 *
 * @author Katherine Youngblood
 */
export abstract class SearchQueryBuilder implements ISearchQueryBuilder {
    protected static liveBlock = 'isLiveBlockSearchable';
    protected static dealerBlock = 'isDealerBlockSearchable';
    protected static runList = 'isRunBlockSearchable';
    protected static endTime = 'auctionEndTime,scheduledStartTime,rlSaleDate';

    /**
     * This method checks to see if an instance of the queryBuilder object exist.
     * If not, it is initialized to a new instance of bodyBuilder.
     * We do this because bodyBuilder
     * @returns {bodybuilder.Bodybuilder}
     */
    get queryBuilder(): bodybuilder.Bodybuilder {
        if (!this._queryBuilder) {

            this._queryBuilder = this._bodybuilder();
        }

        return this._queryBuilder;

    }

    protected _bodybuilder = require('bodybuilder');
    protected mmfEntity = {

        'query': '',
        'type': 'phrase_prefix',
        'lenient': 'true',
        'fields': []

    };


    protected liveBlockQuery = {
        fields: [SearchQueryBuilder.liveBlock
            , SearchQueryBuilder.dealerBlock
            , SearchQueryBuilder.runList],
        query: true
    };

    protected endTime = {
        auctionEndTime: {order: 'asc', missing: '_last'},
        scheduledStartTime: {order: 'asc', missing: '_last'},
        rlSaleDate: {order: 'asc', missing: '_last'}
    };

    private _queryBuilder: Bodybuilder;


    /**
     * Builds a the range part of the search query by parsing a "-" delimiter
     * @param {string} rangeValue
     * @param {string} defaultEndValue
     * @returns {object} the rangeEntity
     */
    protected static buildRange(rangeValue: string, defaultEndValue: string): object {

        let rangeEntity = {
            'gte': '0000',
            'lte': '0000',
            'boost': 2.0
        };

        let start = '';
        let end = '';
        if (rangeValue.indexOf('-') !== -1) {
            start = rangeValue.split('-')[0];
            end = rangeValue.split('-')[1];
        } else {
            start = rangeValue;
            end = defaultEndValue;
        }
        rangeEntity['gte'] = start;
        rangeEntity['lte'] = end;
        return rangeEntity;

    }

    /**
     * Resolve passed field names to ES field names
     * Note: if this gets too large, we should refactor to use a mapping pattern
     * @param sortField
     */
    private static resolveSortName(sortField: string): string {

        switch (sortField) {
            case 'exteriorColour':
                sortField = 'exteriorColor.keyword';
                break;
            case 'engine':
                sortField = 'engineName.keyword';
                break;
            case 'originalEngine':
                sortField = 'origEngineName.keyword';
                break;
            case 'country':
                sortField = 'countryName.keyword';
                break;
            case 'auctionLocation':
                sortField = 'processingLocation.keyword';
                break;
            case 'state':
                sortField = 'stateAbbreviation.keyword';
                break;
            case 'offsiteState':
                sortField = 'stateAbbreviation.keyword';
                break;
            case 'grade':
                sortField = 'gradeValue';
                break;
            case 'year':
            case 'odometer':
            case 'endTime':
                break;
            case 'runList':
                sortField = SearchQueryBuilder.runList;
                break;
            case 'dealerBlock':
                sortField = SearchQueryBuilder.dealerBlock;
                break;
            case 'liveBlock':
                sortField = SearchQueryBuilder.liveBlock;
                break;
            case 'vehicleType':
                sortField = 'bodyType.keyword';
                break;
            case 'seller':
                sortField = 'sellerOrganizationName.keyword';
                break;
            default:
                sortField = sortField + '.keyword';
                break;
        }

        return sortField;
    }

    /**
     * build the order part of the sort query
     *
     * @param orderBy
     */
    private static buildOrderBy(orderBy: string, index: number): string {
        // default sortOrder if none is sent
        let order = 'asc';
        let orderList = [];

        if (orderBy && orderBy.indexOf(',') >= 0) {
            orderList = orderBy.split(',');
            if (orderList[index]) {
                order = orderList[index];
            }
            // make sure the index is 0 because if not, we want to default the order to asc
        } else if (orderBy && index === 0) {
            order = orderBy;
        }
        return order;
    }

    /**
     * Builds the live block query
     * @param blockFilter
     */
    protected buildLiveBlockQuery(blockFilter: string): void {

        if (blockFilter) {
            this.liveBlockQuery.fields = [];
            let filter = blockFilter.split(',');
            for (let element of filter) {
                switch (element) {
                    case 'liveBlock':
                        this.liveBlockQuery.fields.push(SearchQueryBuilder.liveBlock);
                        break;
                    case 'runList':
                        this.liveBlockQuery.fields.push(SearchQueryBuilder.runList);
                        break;
                    case 'dealerBlock':
                        this.liveBlockQuery.fields.push(SearchQueryBuilder.dealerBlock);
                        break;
                    default:
                        // default to all 3
                        this.liveBlockQuery.fields.push(SearchQueryBuilder.liveBlock);
                        this.liveBlockQuery.fields.push(SearchQueryBuilder.dealerBlock);
                        this.liveBlockQuery.fields.push(SearchQueryBuilder.runList);

                        break;
                }
            }
        }
    }

    /**
     * build the inner query whether it is a single value or list of values
     *
     * Supports sending down list of fieldNames
     */
    protected buildInnerQuery(query: any, fieldName: string, builder: Bodybuilder): void {
        let fields = fieldName.split(',');
        let type = 'match';

        if (query && query.length === 1 && fields.length === 1) {
            builder.andQuery(type, fieldName, query[0]);
        } else {
            let queryListBuilder = this._bodybuilder();
            // split the fieldNames parameter in case we want to query multiple fields
            for (let field of fields) {
                for (let element of query) {
                    queryListBuilder.orQuery(type, field, element);
                }
            }
            builder.andQuery('bool', () => queryListBuilder);
        }
    }


    protected constructor() {
    }

    /**
     * Builds the search query
     * @returns {string}
     */
    build(): string {
        return JSON.stringify(this.queryBuilder.build());
    }


    /**
     * This sort accepts a comma delimited list of sort fields and order by associated
     * with those search fields.  The list is parsed and iterated over to build the sort query
     * If no values are supplied, then a default sort associated with endTime is constructed.
     *
     * @param {string} sortBy
     * @param {string} orderBy
     * @returns {string}
     */
    sort(sortBy?: string, orderBy?: string): this {
        let sortQuery = [];

        if (sortBy) {

            let sortFields = sortBy.split(',');

            sortFields.forEach((element: string) => {
                let fieldQuery = {};
                let orderQuery = {};
                let index = sortFields.indexOf(element);


                // after you get the index of the element, then resolve the name
                element = SearchQueryBuilder.resolveSortName(element);
                orderQuery['order'] = SearchQueryBuilder.buildOrderBy(orderBy, index);
                orderQuery['missing'] = '_last';
                if (element === 'endTime') {
                    this.buildEndTime(sortQuery, orderQuery);
                } else {
                    fieldQuery[element] = orderQuery;
                    sortQuery.push(fieldQuery);
                }


            });
        } else {
            sortQuery.push(this.endTime);
        }

        this.queryBuilder.sort(sortQuery);
        return this;
    }

    /**
     * Builds the from part of the search query
     * @param {number} start
     */
    from(start: number): this {
        if (start) {
            this.queryBuilder.from(start);
        }
        return this;
    }

    /**
     * Resets the bodyBuilder object
     */
    reset(): void {
        this._queryBuilder = null;
    }

    /**
     * Sets the live block query (dealerBlock, runList, liveBlock)
     * @param blockFilter - which block to filter
     */
    withLiveBlock(blockFilter?: string): this {
        this.buildLiveBlockQuery(blockFilter);
        this.queryBuilder.andQuery('query_string', this.liveBlockQuery);
        return this;
    }


    /**
     * Adds to the query to fetch vehicles that are not sold
     *
     */
    withVehiclesNotSold(): this {

        let builder = this.determineBuilderToUse();
        for (let vehicleStatus of SOLD_VEHICLE_STATUS) {
            builder.notQuery('match', 'vehicleStatus.keyword', vehicleStatus);
        }

        return this;
    }

    abstract withAccessGroups(accessGroups: any): this;

    abstract withCountryName(country: string): this;

    protected abstract determineBuilderToUse(): bodybuilder.Bodybuilder;

    /**
     * Builds the endTime part of the sort query
     * @param sortQuery
     * @param orderBy
     */
    private buildEndTime(sortQuery: any, orderBy: any): void {

        this.endTime.auctionEndTime = orderBy;
        this.endTime.scheduledStartTime = orderBy;
        this.endTime.rlSaleDate = orderBy;

        sortQuery.push(this.endTime);
    }


}
