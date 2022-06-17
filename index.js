let users = [
    {
        id: "123456789",
        createdDate: "2021-01-06T00:00:00.000Z",
        status: "En validation",
        firstName: "Mohamed",
        lastName: "Taha",
        userName: "mtaha",
        registrationNumber: "2584",
    },
    {
        id: "987654321",
        createdDate: "2021-07-25T00:00:00.000Z",
        status: "Validé",
        firstName: "Hamid",
        lastName: "Orrich",
        userName: "horrich",
        registrationNumber: "1594",
    },
        {
        id: "852963741",
        createdDate: "2021-09-15T00:00:00.000Z",
        status: "Rejeté",
        firstName: "Rachid",
        lastName: "Mahidi",
        userName: "rmahidi",
        registrationNumber: "3576",
    }
];

const RemoveIc = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style=" "><path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path></svg>`;
const DeleteIcon = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>`;
const table = document.querySelector('#table-data');
const modelData = document.querySelector('#model-data');
const tabelContainer = document.querySelector('.card-cont');
const model = document.querySelector('.modal-cont');
const ToastContainer = document.querySelector('.toast-container');
var idToDelete = null;


const addElement= (e) => {
    table.innerHTML+=`<tr data-element="${e.id}"><td>${e.id}</td><td>${getDate(e.createdDate)}</td><td><div class="tags ${e.status}">${e.status}<div></td><td>${e.lastName}</td><td>${e.firstName}</td><td>${e.userName}</td><td>${e.registrationNumber}</td><td><div class="svg-container" onclick='deleteElement(${e.id})'>${DeleteIcon}</div></td></tr>`;
}
const deleteElement = (id) => {
    idToDelete=id;
    showModal('delete-confimation');
}
const ondeleteElement = ()=>{
    document.querySelector(`[data-element="${idToDelete}"]`).remove();
    users=users.filter(e=>e.id!=idToDelete);
    hideModal();
    showToast(1,'Utilisateur supprimé avec succès !');
    if(users.length==0) tabelContainer.style.display = 'none'
}
const getDate = (d)=>{
    return (new Date(d)).toLocaleDateString('en-GB');
}
const initData = ()=>{
    for(let u of users) addElement(u);
}
const showModal = (e)=>{
    const element = document.querySelector(`#${e}`);
    if(element==undefined) return;
    modelData.innerHTML = element.innerHTML;
    model.classList.add('show');
}
const hideModal = ()=>{
    model.classList.remove('show');
    model.classList.add('hide');
    modelData.innerHTML = '';
    setTimeout(() => {model.classList.remove('hide');}, 100);
}
const validate=(element)=>{
    let v = element.value;
    let err = element.parentNode.querySelector('.err-msg');
    if(v==null || v==''){
        err.innerText = 'Invalide valeur ';
        return(false);
    }
    err.innerText = '';
    return v;
}
const addNewElement = ()=>{
    const newElement = {
        id: "89296374"+users.length,
        createdDate: new Date(validate(modelData.querySelector("[name='createdDate']"))).toISOString(),
        status: validate(modelData.querySelector("[name='status']")),
        firstName: validate(modelData.querySelector("[name='firstName']")),
        lastName: validate(modelData.querySelector("[name='lastName']")),
        userName: validate(modelData.querySelector("[name='userName']")),
        registrationNumber: validate(modelData.querySelector("[name='registrationNumber']")),
    }
    if(Object.values(newElement).includes(false)) {showToast(0,'Veuillez vérifier les informations que vous avez saisies');return;}
    users.push(newElement);
    addElement(newElement);
    if(users.length==1) tabelContainer.style.display = 'block';
    hideModal();
    showToast(1,'Utilisateur ajouté avec succès !');
}
const generateSuccesToast = (id,msg)=>{
    return(
        ` <div class="svg-el" id=${id}> 
            <div class='rmv-toast' onclick='removeToast("${id}")'>${RemoveIc} </div>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg> 
        </div> 
        <div class="toast-msg"> ${msg} </div>`
    );
}
const generateErrorToast = (id,msg)=>{
    return(
        ` <div class="svg-el" id=${id}> 
        <div class='rmv-toast' onclick='removeToast("${id}")'>${RemoveIc} </div>
        ${RemoveIc}
        </div> 
        <div class="toast-msg"> ${msg} </div>`
    );
}
const showToast = (e,msg)=>{
    const id = 'Toast__'+(new Date()).getTime();
    const ele = (e==1) ? generateSuccesToast(id,msg):generateErrorToast(id,msg);
    const el = document.createElement('div');
    el.innerHTML=ele;
    el.setAttribute('class','toast-element '+((e==1)?'taost-done':'toast-error'));
    ToastContainer.appendChild(el);
    setTimeout(() => {
        el.classList.add('show');
        setTimeout(() => {
            hideToast(el);
        }, 9000);
    }, 100);
}
const hideToast = (el)=>{
    el.style.transform='scale(0)';
    setTimeout(() => {
        el.remove();
    }, 600);
}
const removeToast = (id)=>{
    const el = document.querySelector('#'+id);
    if(el!=undefined) hideToast(el.parentNode);
}

initData();