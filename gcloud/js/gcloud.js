console.log("#################################");
console.log("#### Versionado v1.1.3         ##");
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


    switch (cliente) {
        case "login_cliente_btspain":
            console.log("btspain")
            client.setEnvironment(platformClient.PureCloudRegionHosts.eu_west_1);
            id_cliente = "111d49da-28b1-43f0-af26-c03f42e80463";
            redirectUri = "https://aferfra.github.io/gcloud_scripts.html";
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
                    console.log("TO-DO dot com");
                    redirectUri = "TO-DO"
                    break;
                case "login_otros_dominio_ie":
                    client.setEnvironment(platformClient.PureCloudRegionHosts.eu_west_1);
                    redirectUri = "TO-DO"
                    break;
                case "login_otros_dominio_de":
                    console.log("TO-DO dot com");
                    redirectUri = "TO-DO"
                    break;
            }
    }


    client.loginImplicitGrant(id_cliente, redirectUri)    
    .then((data) => {
        console.log("## Estamos dentro ##")
        gcscript = document.getElementsByClassName("gcscript");

        document.getElementById("login_result").innerHTML = cliente_text;
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
// FUNCION AGREGAR WRAPUP NAME
// ######################################################
function addWrapupCode(wrapup_name){
    console.log("#### Entramos en [Añadir nuevo WrapUp] ##");
    var body;
    input = document.getElementById('wrapup_name').value;
    arr = (input.split(", "));

    if (arr[0].includes(",")) {
        arr = (input.split(","));
    }

    // Recorremos todos los valores
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
            document.getElementById("wrapup_name_result").innerHTML = "OK";   
            })
        .catch((err) => {
            console.log("#### ERROR: No se ha podido añadir el WrapUp Name [" + valor + "] ##");
            console.error(err);
            console.log("### FIN ##");
            document.getElementById('wrapup_name').value = "";
            document.getElementById("wrapup_name_result").innerHTML = "KO";        
        });
    })   
}