const DIRECTORYFIELD = document.getElementById("directoryField");
const SCANLIST = document.getElementById("scanList");

function make_subdir_li(subdir) {
    let li = document.createElement("li");
    li.setAttribute("id", subdir);
    li.classList.add("subdirli");
    li.innerText = subdir + '/';
    
    return li;
}

function make_file_li(fileName) {
    let li = document.createElement("li");
    li.classList.add("datafileli");
    li.setAttribute("id", fileName.split(".")[0]);
    li.innerText = fileName;
    
    return li;
}

async function populateScanList(e) {
    if (e.keyCode === 13) {
        const resp = await fetch(
            "/ttheta_scan/get_directory_list",
            {
                method: "POST",
                body: JSON.stringify({directory: DIRECTORYFIELD.value}),
                cache: "no-cache",
                headers: new Headers({
                    "content-type": "application/json"
                })
            }
        );

        const resp_json = await resp.json();

        SCANLIST.innerHTML = "";

        let up = make_subdir_li("up");
        up.innerText = ".."
        SCANLIST.append(up);

        for (f of resp_json.Subdirs) {
            let li = make_subdir_li(f);
            SCANLIST.appendChild(li);
        }
        for (f of resp_json.Files) {
            let li = make_file_li(f);
            SCANLIST.appendChild(li);
        }
    }
}

DIRECTORYFIELD.addEventListener("keydown", populateScanList, false);
