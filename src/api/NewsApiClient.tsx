import { Client, cacheExchange, fetchExchange } from 'urql';

interface NewsApiEndpointType {
    region: string
    environment: string
    key: string
    version: number
}

const NewsApiEndpoint = (props:NewsApiEndpointType) => {
    return `https://api-${props.region}.hygraph.com/v${props.version}/${props.key}/${props.environment}`;
}
const NewsClient = (props:NewsApiEndpointType):Client => new Client({
    url: NewsApiEndpoint(props),
    exchanges: [cacheExchange, fetchExchange],
});

export default NewsClient;