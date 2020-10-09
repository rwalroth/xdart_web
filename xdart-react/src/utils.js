async function get_schedules() {
    try {
        const resp = await fetch("/get_user_schedules", {method: 'POST'});

        const resp_json = await resp.json();

        if (resp_json.message === "Invalid token") {
            return null;
        }

        return resp_json.schedules;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default get_schedules;