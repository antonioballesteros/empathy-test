import { Plot } from "../../component"
import {getOpportunities} from './data'

const Opportunities = () => {
    const opportunities = getOpportunities()
    return (
        <div>
            <div>Show Opportunities</div>
            <Plot data={opportunities} />
        </div>
    )
}

export default Opportunities