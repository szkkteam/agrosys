import { useQuery } from 'utils/hooks'

export default function () {
    const query = useQuery();
    return query.get('season')
}