import {Bodybuilder} from 'bodybuilder';
import {SearchQueryBuilder} from './SearchQueryBuilder';


/**
 * Class VehicleSearchQueryBuilder
 *
 * This class uses the Builder design pattern to build ElasticSearch query strings for New Wave Search
 * It uses the bodybuilder node package https://bodybuilder.js.org/
 *
 * @author Katherine Youngblood
 */
export class VehicleSearchQueryBuilder extends SearchQueryBuilder {
    private _innerBuilder: Bodybuilder;


    constructor() {
        super();
    }

    /**
     * Override build method in order to finish the bodybuilder query
     * @returns {string}
     */
    build(): string {
        if (this.innerBuilder.hasQuery()) {
            this.queryBuilder.orQuery('bool', () => this.innerBuilder);
        }
        return super.build();
    }

    /**
     * Reset the bodyBuilder instances
     */
    reset(): void {
        super.reset();
        this.innerBuilder = null;
    }

    /**
     * Adds make to the search query
     * If an innerBuilder object exists, we are in the middle of constructing the query
     * for the next make in a collection; therefore we need to finish off the previous
     * make by calling the .orQuery method and reinitialize the innerBuilder class
     * @param {string} make
     * @returns {this}
     */
    addMake(make: string): this {
        if (this.innerBuilder.hasQuery()) {
            this.queryBuilder.orQuery('bool', () => this.innerBuilder);
            this.innerBuilder = null;
        }

        if (make) {
            this.buildInnerQuery(make.split(','), 'make', this.innerBuilder);
        }

        return this;
    }


    /**
     * Adds model to the search query.
     * Model is parsed two ways.  First by a pipe "|" then by a comma ","
     * The pipe separates models that belong to a single make
     * The comma separates mulitle models for a single make
     * So if you have make=ford,honda&model=fusion,escape|accord
     * The matches is ford with fusion and escape models
     *  honda with acoord model
     * @param {string} model
     * @returns {this}
     */
    withModel(model: string): this {

        if (model) {
            let modelList = model.split('|');
            let queryList = [];
            for (let element of modelList) {
                let modelNameList = element.split(',');
                for (let name of modelNameList) {
                    let andMatchQuery = {};
                    andMatchQuery['query'] = name;
                    andMatchQuery['operator'] = 'and';
                    queryList.push(andMatchQuery);
                }
                this.buildInnerQuery(queryList, 'model', this.innerBuilder);
            }
        }

        return this;
    }


    /**
     * Adds exterior color to the search query
     * @param {string} color
     * @returns {this}
     */
    withExteriorColor(color: string): this {
        if (color) {
            this.buildInnerQuery(color.split(','), 'exteriorColor', this.innerBuilder);
        }
        return this;
    }

    /**
     * Adds state to the search query.
     * Requirements are to have an EXACT match on search state
     * Multiple states can be passed
     * @param {string} state
     * @returns {this}
     */
    withState(state: string): this {
        if (state) {
            this.buildInnerQuery(state.toUpperCase().split(','), 'stateAbbreviation.keyword', this.innerBuilder);
        }
        return this;
    }


    /**
     * Adds year or year range to the search query
     * @param {string} year
     * @returns {this}
     */
    withYear(year: string): this {
        if (year) {
            if (year.indexOf('-') !== -1) {
                let yearRange = SearchQueryBuilder.buildRange(year, '');
                this.innerBuilder.andQuery('range', 'year', yearRange);

            } else {
                this.innerBuilder.andQuery('match', 'year', year);
            }
        }

        return this;
    }

    /**
     * Adds mileage or mileage range to the search query
     * @param {string} miles
     * @returns {this}
     */
    withOdometer(miles: string): this {
        if (miles) {
            let odometer = VehicleSearchQueryBuilder.buildRange(miles, '999999');
            this.innerBuilder.andQuery('range', 'odometer', odometer);
        }

        return this;
    }

    /**
     * Adds driveTrain to the search traquery
     * @param {string} driveTrain
     * @returns {this}
     */
    withDriveTrain(driveTrain: string): this {
        if (driveTrain) {
            this.buildInnerQuery(driveTrain.split(','), 'driveTrain', this.innerBuilder);
        }
        return this;
    }

    /**
     * Adds transmission to the search query
     * @param {string} transmission
     * @returns {this}
     */
    withTransmission(transmission: string): this {
        if (transmission) {
            this.buildInnerQuery(transmission.split(','), 'transmission', this.innerBuilder);
        }
        return this;
    }

    /**
     * Adds engine to the search query
     * @param {string} engine
     * @returns {this}
     */
    withEngine(engine: string): this {
        if (engine) {
            this.buildInnerQuery(engine.toUpperCase().split(','), 'engineName.keyword', this.innerBuilder);
        }
        return this;
    }

    /**
     * Adds original engine to the search query
     * @param {string} engine
     * @returns {this}
     */
    withOriginalEngine(engine: string): this {
        if (engine) {
            this.buildInnerQuery(engine.split(','), 'origEngineName', this.innerBuilder);
        }
        return this;
    }

    /**
     * Adds countryName to the search query
     * @param {string} country
     * @returns {this}
     */
    withCountryName(country: string): this {
        if (country) {
            this.buildInnerQuery(country.split(','), 'countryName', this.innerBuilder);
        }
        return this;
    }

    /**
     * Adds trim to the search query
     * @param {string} trim
     * @returns {this}
     */
    withTrim(trim: string): this {
        if (trim) {
            this.buildInnerQuery(trim.split(','), 'trim', this.innerBuilder);
        }
        return this;
    }

    /**
     * Adds auction location to the search query
     *
     * @param {string} auctionLocation
     * @returns {this}
     */
    withAuctionLocation(auctionLocation: string, offsiteState?: string): this {

        if (auctionLocation) {

            let offsiteBuilder = this._bodybuilder();
            let adesaBuilder = this._bodybuilder();
            let processingLocations = auctionLocation.split(',');

            for (let location of processingLocations) {
                switch (location) {
                    case 'onsite':
                        adesaBuilder.orQuery('match_phrase_prefix', 'processingLocation', 'ADESA');
                        break;
                    case 'other':
                        if (offsiteState) {
                            let stateBuilder = this.handleOffsiteState(offsiteState);
                            offsiteBuilder.andQuery('match', 'processingLocation.keyword', 'other');
                            offsiteBuilder.andQuery('bool', () => stateBuilder);
                        } else {
                            adesaBuilder.orQuery('match', 'processingLocation.keyword', 'other');
                        }
                        break;
                    default:
                        adesaBuilder.orQuery('match', 'processingLocation.keyword', location);
                        break;
                }
            }


            if (offsiteBuilder.hasQuery()) {
                adesaBuilder.orQuery('bool', () => offsiteBuilder);
            }

            this.innerBuilder.andQuery('bool', () => adesaBuilder);

        }


        return this;
    }

    /**
     * Adds grade to the search query
     *
     *
     * @param {string} grade
     * @returns {this}
     */
    withGrade(grade: string): this {
        if (grade) {
            let gradeRange = VehicleSearchQueryBuilder.buildRange(grade, '999999');
            this.innerBuilder.andQuery('range', 'gradeValue', gradeRange);
        }
        return this;
    }

    /**
     * Adds body type to the search query
     * @param {string} bodyType
     * @returns {this}
     */
    withBodyType(bodyType: string): this {
        if (bodyType) {
            this.buildInnerQuery(bodyType.split(','), 'bodyType.keyword', this.innerBuilder);
        }
        return this;
    }

    /**
     * Adds seller organization to the search query
     * @param {string} bodyType
     * @returns {this}
     */
    withSellerOrganization(bodyType: string): this {
        if (bodyType) {
            this.buildInnerQuery(bodyType.split('|'), 'sellerOrganizationName.keyword', this.innerBuilder);
        }
        return this;
    }

    /**
     * Adds access groups to the search query
     * @param {string} accessGroups
     * @returns {this}
     */
    withAccessGroups(accessGroups: any): this {
        if (accessGroups) {
            this.buildInnerQuery(accessGroups.split(','), 'viewAccessGroupList,lbViewAccessGroupList,rlViewAccessGroupList', this.innerBuilder);
        }
        return this;
    }

    /**
     * Adds multi-match to the search query
     * @param {string} mmf
     * @param {string} mmv
     * @returns {this}
     */
    withMMF(mmf: string, mmv: string): this {
        if (mmf) {
            this.mmfEntity['query'] = mmv;
            this.mmfEntity['fields'] = mmf.split(',');
            this.innerBuilder.andQuery('multi_match', this.mmfEntity);
        }
        return this;
    }

    /**
     * Sets the live block query (dealerBlock, runList, liveBlock)
     * @param blockFilter - which block to filter
     */
    withLiveBlock(blockFilter?: string): this {
        if (this.innerBuilder.hasQuery()) {
            this.buildLiveBlockQuery(blockFilter);
            this.innerBuilder.andQuery('query_string', this.liveBlockQuery);
        } else {
            super.withLiveBlock(blockFilter);
        }
        return this;
    }

    /**
     * Determine if the inner query builder should be used or the main query builder
     */
    protected determineBuilderToUse(): bodybuilder.Bodybuilder {
        let builder: bodybuilder.Bodybuilder;
        if (this.innerBuilder.hasQuery()) {
            builder = this.innerBuilder;
        } else {
            builder = this.queryBuilder;
        }
        return builder;
    }

    /**
     * Get the innerBuilder (bodyBuilder) instance
     * @returns {bodybuilder.Bodybuilder}
     */
    private get innerBuilder(): bodybuilder.Bodybuilder {
        if (!this._innerBuilder) {
            this._innerBuilder = this._bodybuilder();
        }
        return this._innerBuilder;
    }

    /**
     * set the innerBuilder (bodyBuilder) instance
     * @returns {bodybuilder.Bodybuilder}
     */
    private set innerBuilder(value: bodybuilder.Bodybuilder) {
        this._innerBuilder = value;
    }

    /**
     * Builds an inner OR query for states
     * @param offsiteState
     */
    private handleOffsiteState(offsiteState: string): bodybuilder.Bodybuilder {
        let stateBuilder = this._bodybuilder();

        if (offsiteState.indexOf(',') >= 1) {
            this.buildInnerQuery(offsiteState.split(','), 'stateAbbreviation.keyword', stateBuilder);
        } else {
            stateBuilder.orQuery('match', 'stateAbbreviation.keyword', offsiteState);
        }

        return stateBuilder;
    }



}
