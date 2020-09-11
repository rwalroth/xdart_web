// import {get_schedules, set_beamline_menu} from "./base";

const LOGIN = document.getElementById("login");
const CONTROLLIST = document.getElementById("control-list");


function show_login_form(showLogin) {
    if (showLogin) {
        if (LOGIN.classList.contains("hidden")) LOGIN.classList.remove("hidden");
        if (!CONTROLLIST.classList.contains("hidden")) CONTROLLIST.classList.add("hidden");
    } else {
        if (CONTROLLIST.classList.contains("hidden")) CONTROLLIST.classList.remove("hidden");
        if (!LOGIN.classList.contains("hidden")) LOGIN.classList.add("hidden");
    }
}

async function set_control_menu() {
    try {
        const schedules = await get_schedules();
        if (schedules === null) {
            show_login_form(true);
        } else {
            show_login_form(false);
            set_beamline_menu(schedules, NAVBARLINKS, 0);
            set_beamline_menu(schedules, CONTROLLIST, 1);
        }
    } catch (error) {
        console.log(error);
    }
}


async function handle_login_submit(ev) {
    ev.preventDefault();
    let formData = new FormData(LOGIN);
    LOGIN.reset();
    try {
        const resp = await fetch("/login", {
            method: "POST",
            body: formData
        });

        const resp_json = await resp.json();

        if (resp_json.message === "login successful") {
            console.log("successful login")
            set_control_menu();
        }
    }
    catch (error) {
        console.log(error);
    }
}


set_control_menu();

LOGIN.addEventListener("submit", handle_login_submit, false);