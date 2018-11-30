/**
 * Interface SearchQueryBuilder
 *
 * The interface for the ElasticSearch Query Builder
 *
 * @author Katherine Youngblood
 */
export interface ISearchQueryBuilder {
    build(): string;
    sort(sortBy?: string, orderBy?: string): this;
    reset(): void;
    withLiveBlock(blockFilter?: string): this;
    withAccessGroups(accessGroups: any): this;
}
