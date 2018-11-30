import 'reflect-metadata';
import { Callback, Context } from 'aws-lambda';

// This is the initial version, we will clean the code up a bit in next iteration.
export const _healthcheck = async (event: any, context: Context, callback: Callback) => {
    const reportHealthStatus = (status: any) => {
        const STATS_LOG_MESSAGE = 'MONITORING|%d|%s|%s|%s|%s';
        const NW_MONITORING_METRIC_NAME_HEALTH_CHECK = 'system.microservice.healthcheck';
        const getMetricTags = (tags: { [tag: string]: string; } = {}): string => {
            let result = '#Environment:' + process.env.STAGE;
            const otherTags = Object.keys(<any> tags).filter(key => !!tags[key]).map(key => (key + ':' + tags[key]));
            if (otherTags.length > 0) {
                result += (',' + otherTags.join(','));
            }
            return result;
        };
        console.log(STATS_LOG_MESSAGE,
            Math.round(Date.now() / 1000),
            '1', 'count',
            NW_MONITORING_METRIC_NAME_HEALTH_CHECK,
            getMetricTags({
                component: status.check,
                nwService : (process.env.NW_DEPLOY_SERVICE_NAME || process.env.SERVICE_NAME),
                nwFunction: (process.env.NW_DEPLOY_FUNCTION_NAME || process.env.AWS_LAMBDA_FUNCTION_NAME)
            }));
    };
    const serviceStatus = {
        check : 'microservice',
        status: 'UP'
    };
    reportHealthStatus(serviceStatus);
    callback(null, {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            serviceName: context.functionName,
            serviceVersion: context.functionVersion,
            lastUpdated: Date.now(),
            status: 'UP',
            dataServices: [
                serviceStatus
            ]
        })
    });
};
