function make_beamline_link(schedule, num) {
    let li = document.createElement("li");
    li.setAttribute("id", schedule.beamline + "_" + num);
    let a = document.createElement("a");
    a.setAttribute("href", "bl" + schedule.beamline);
    a.innerHTML = "BL" + schedule.beamline;
    li.appendChild(a);
    return li;
}

function set_beamline_menu (schedules, menu, idx) {
    menu.innerHTML = "";
    let schedule;
    for (schedule of schedules) {
        let li1 = make_beamline_link(schedule, idx);
        menu.appendChild(li1);
    }
}

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

export { make_beamline_link, get_schedules, set_beamline_menu }