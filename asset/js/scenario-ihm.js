let semSelect = {},
    timeliner, currentScenario,
    mdWait, mdAddScenario;


function initVisios() {
    showListeScenario();

    //gestion des boutons    
    mdWait = new jBox('Modal', {
        width: 200,
        height: 100,
        title: 'Patience...',
        content: '<div class="loading">' +
        '<p style="width:150px" >Merci de patienter...</p>' +
        '</div>'
    });
}

//fonction spécifiques à la page  
function showListeScenario() {
    d3.select('#ddmListeScenario').selectAll('li').remove();
    d3.select('#ddmListeScenario').selectAll('li').data(itemsScenario).enter().append('li').append('a')
        .attr("class", "dropdown-item")
        .html((s, i) => {
            return s['o:title'];
        })
        .on('click', chargeScenario);
}

function chargeScenario(e, d) {
    if(currentScenario)currentScenario.timeliner.hide();
    currentScenario = new scenario({
        'idConteneur':'mediaCards',
        'sgtProps':sgtProps,
        'resource':d,
        'actant':actant,    
        'urls': {
            'getItem':urlApi + '/items/',
            'creaTrack':urlSite + '/page/ajax?helper=Scenario&type=saveTrack&json=1',
            'gen':urlSite + '/page/ajax?helper=Scenario&type=genereScenario&json=1&gen=fromUti',
            'del':urlSite + '/page/ajax?helper=Scenario&type=deleteScenario&json=1&item_id=',
            'txtToObj':urlSite + '/page/ajax?helper=Scenario&type=scenarioTxtToObj&gen=fromUti&json=1',
            'delTrack':urlSite + '/page/ajax?helper=Scenario&type=deleteTrack&json=1',
        },
        'fonctions':{'showListeScenario':showListeScenario,'chargeScenario':chargeScenario},
        'scenarios':itemsScenario
    })
}
function createScenario() {
    currentScenario = new scenario({
        'actant':actant,    
        'urls': {'crea':urlSite + '/page/ajax?helper=Scenario&type=genereScenario&json=1&inScheme=groupByCategoryCreator'},
        'fonctions':{'showListeScenario':showListeScenario,'chargeScenario':chargeScenario},
        'scenarios':itemsScenario
    })
}


