console.log("#################################");
console.log("#### Versionado v1.1.13        ##");
console.log("#### Evolutio                  ##");
console.log("#### Genesys Cloud Scripts     ##");
console.log("#################################");

// ######################################################
// Variables Generales
// ######################################################
let cliente;
let id_cliente;
let redirectUri;
let wrapup_name_array = [];
let arr = [];

// Obtain a reference to the platformClient object
let platformClient = require('platformClient');
// Plataforma Genesys Cloud
let client = platformClient.ApiClient.instance;        
//const clientId = "111d49da-28b1-43f0-af26-c03f42e80463";        
// API Routing
let RoutingApi = new platformClient.RoutingApi();
// Genesys Cloud Dominio
//client.setEnvironment(platformClient.PureCloudRegionHosts.eu_west_1);
client.setPersistSettings(true);
//client.setDebugLog(console.log, 50); //Si activamos debug, aplicar <body> en array de json: obj.body.entities[0].name

// ######################################################
// FUNCION LOGIN
// ######################################################
function login(){
    // Recogemos valor de Cliente
    /*
    form_cliente = document.getElementById('login_cliente');
    cliente = form_cliente.options[form_cliente.selectedIndex].value;
    cliente_text = form_cliente.options[form_cliente.selectedIndex].text;
    id_cliente = document.getElementById('login_otros_cliente').value;

    if (cliente == "login_cliente_otro" & id_cliente == "") {
        //document.getElementById('form_login').hidden = true
        document.getElementById('form_login_submit').hidden = true;
        document.getElementById('form_login_otros').hidden = false;
        return
    } else {
        document.getElementById('form_login_submit').hidden = false;
        document.getElementById('form_login_otros').hidden = true;
    }
    */

    id_cliente = document.getElementById('login_otros_cliente').value;

    switch (cliente) {
        case "login_cliente_btspain":
            console.log("btspain")
            client.setEnvironment(platformClient.PureCloudRegionHosts.eu_west_1);
            //id_cliente = ""; // SETEAR
            redirectUri = "https://aferfra.github.io/gcloud/index.html";
            break;
        case "login_cliente_repsol":
            console.log("repsol")
            id_cliente = "TO-DO";
            redirectUri = "TO-DO"
            break;
        default:
            console.log("TO-DO Otro")
            var dominio = document.getElementById('login_otros_dominio');
            dominio = dominio.options[dominio.selectedIndex].value;
            switch (dominio) {
                case "login_otros_dominio_com":
                    console.log("# dot com");
                    redirectUri = "https://aferfra.github.io/gcloud/index.html"
                    break;
                case "login_otros_dominio_ie":
                    console.log("# dot ie");
                    client.setEnvironment(platformClient.PureCloudRegionHosts.eu_west_1);
                    redirectUri = "https://aferfra.github.io/gcloud/index.html"
                    break;
                case "login_otros_dominio_de":
                    console.log("# dot de");
                    //TO-DO SetEnviroments DE
                    client.setEnvironment(platformClient.PureCloudRegionHosts.eu_west_1);
                    redirectUri = "https://aferfra.github.io/gcloud/index.html"
                    break;
            }
    }

    // Hacemos Login
    client.loginImplicitGrant(id_cliente, redirectUri)    
    .then((data) => {
        console.log("## Estamos dentro ##")
        gcscript = document.getElementsByClassName("gcscript");

        //document.getElementById("login_result").innerHTML = cliente_text;
        document.getElementById("client_name_connected").innerHTML = "Conectado en: BT SPAIN";
        document.getElementById('client_name_connected').hidden = false;
        document.getElementById('login').hidden = true;
        document.getElementById('logout').hidden = false;

        for (i=0; i < gcscript.length; i++){
            // Ocultamos idioma español
            gcscript[i].hidden = false;
        }

        return;
    })
    .catch((err) => {
        // Handle failure response
        console.log(err);
        gcscript = document.getElementsByClassName("gcscript");

        for (i=0; i < gcscript.length; i++){
            // Ocultamos idioma español
            gcscript[i].hidden = false;
        }

        console.log("### FIN ##");
        return;
    });
}

// ######################################################
// [ROUTING]
// ######################################################
// ######################################################
// FUNCION AGREGAR WRAPUP NAME
// ######################################################
function addWrapupName(){
    console.log("#### Entramos en [Añadir nuevo WrapUp] ##");
    var body;
    input = document.getElementById('wrapup_name').value;
    arr = new Set([input])

    // Recorremos los valores para separar las comas
    arr.forEach( function( valor, indice, array) {
        console.log(valor);
        //arr = (valor.split(", "))
        if (valor.includes(",")){
            arr = (valor.split(","))
        } else if (valor.includes(", ")) {
            arr = (valor.split(", "))
        }
    })

    // Recorremos todos los valores para dar de alta en Genesys Cloud
    arr.forEach( function( valor, indice, array) {
        console.log("#### Agregamos wrapup code [" + valor + "] ##")
        body = {
            'name': valor
        };
        // Llamamos a la API
        RoutingApi.postRoutingWrapupcodes(body)
        .then(() => {
            console.log("#### Se añade correctamente [" + valor + "] ##");
            document.getElementById('wrapup_name').value = "";
            document.getElementById("wrapup_name_result").innerHTML = "Se han creado: " + input;
            })
        .catch((err) => {
            console.log("#### ERROR: No se ha podido añadir el WrapUp Name [" + valor + "] ##");
            console.error(err);
            console.log("### FIN ##");
            document.getElementById('wrapup_name').value = "";
            document.getElementById("wrapup_name_result").innerHTML = "ERROR. NO se han creado: " + input;
        });
    })

    gcscript = document.getElementsByClassName("gcscript_wrapup_name_result");
    for (i=0; i < gcscript.length; i++){
        // Ocultamos idioma español
        gcscript[i].hidden = false;
    }
}
// ######################################################
// [ROUTING]
// ######################################################
// ######################################################
// FUNCION AGREGAR SKILL
// ######################################################
function addSkill(){
    console.log("#### Entramos en [Añadir nuevo Skill] ##");
    var body;
    input = document.getElementById('skill').value;
    arr = new Set([input])

    // Recorremos los valores para separar las comas
    arr.forEach( function( valor, indice, array) {
        console.log(valor);
        //arr = (valor.split(", "))
        if (valor.includes(",")){
            arr = (valor.split(","))
        } else if (valor.includes(", ")) {
            arr = (valor.split(", "))
        }
    })

    /*arr = (input.split(", "));

    if (arr[0].includes(",")) {
        arr = (input.split(","));
    }*/

    // Recorremos todos los valores para dar de alta en Genesys Cloud
    arr.forEach( function( valor, indice, array) {
        console.log("#### Agregamos skill [" + valor + "] ##")
        body = {
            'name': valor
        };
        // Llamamos a la API
        RoutingApi.postRoutingSkills(body)
        .then(() => {
            console.log("#### Se añade correctamente [" + valor + "] ##");
            document.getElementById('skill').value = "";
            document.getElementById("skill_result").innerHTML = "Se han creado: " + input;
            })
        .catch((err) => {
            console.log("#### ERROR: No se añaden [" + valor + "] ##");
            console.error(err);
            console.log("### FIN ##");
            document.getElementById('skill').value = "";
            document.getElementById("skill_result").innerHTML = "ERROR. NO se han creado: " + input;
        });
    })
    
    gcscript = document.getElementsByClassName("gcscript_skill_result");
    for (i=0; i < gcscript.length; i++){
        // Ocultamos idioma español
        gcscript[i].hidden = false;
    }
}