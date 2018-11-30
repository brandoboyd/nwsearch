import {SearchQueryBuilder} from './SearchQueryBuilder';

/**
 * Class VinSearchQueryBuilder
 *
 * This class uses the Builder design pattern to build ElasticSearch query strings for New Wave Search
 * It uses the bodybuilder node package https://bodybuilder.js.org/
 *
 * @author Katherine Youngblood
 */
export class VinSearchQueryBuilder extends SearchQueryBuilder {

    constructor() {
        super();
    }

    /**
     * Adds VIN or partial VIN
     * @param {string} vin - full or partial Vehicle Identification Number
     * @returns {SearchQueryBuilder} - and instance of this class
     */
    addVin(vin: string): this {

        let wildcard = {'vin': 'value'};

        if (vin) {
            switch (true) {
                case (vin.length === 10 || vin.length === 17) : // full vin
                    this.queryBuilder.andQuery('match', 'vin', vin.toLowerCase());

                    break;
                case (vin.length >= 4) :
                    wildcard['vin'] = '*' + vin.toLowerCase();
                    this.queryBuilder.andQuery('wildcard', wildcard);
                    break;
                default:  // do nothing
                    break;
            }

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
            this.buildInnerQuery(country.split(','), 'countryName', this.queryBuilder);
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
            this.buildInnerQuery(accessGroups.split(','), 'viewAccessGroupList,lbViewAccessGroupList,rlViewAccessGroupList', this.queryBuilder);
        }

        return this;
    }

    /**
     * Determine if the inner query builder should be used or the main query builder
     */
    protected determineBuilderToUse(): bodybuilder.Bodybuilder {
        return this.queryBuilder;
    }


}
