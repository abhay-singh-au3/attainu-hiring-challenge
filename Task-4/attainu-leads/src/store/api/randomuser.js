import { store } from '../store';

function fetchLead() {
    let url = "https://randomuser.me/api/";
    fetch(url)
        .then(data => data.json())
        .then(function (response) {
            response.results.push({ converted: false });
            store.dispatch({
                type: "LEAD_LOADED",
                data: response.results
            })
        })
}

export { fetchLead }