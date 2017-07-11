/**LLAMADO A OTROS MODÚLOS**/
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {


    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Limpiando memoria de Creeps inexistentes:', name);
        }
    }
    
 /** TIMER **/
 
    var tiempo = Game.time;
    console.log('Tiempo de juego:'+ tiempo);
    console.log('Tiempo restante: '+(20000 - tiempo));

 /** CONTEO DE CREEPS **/   

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Cosechadores: ' + harvesters.length);
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Constructores: ' + builders.length);    

    
 /** CREACIÓN DE LOS CONSTRUCTION SITES **/

    if(Game.constructionSites.length == 5)
    {
        console.log('Límite de extensiones alcanzado.');    
    }
    else
    {
        if(Game.constructionSites.length > 5)
        {
            console.log('Límite de extensiones alcanzado');
        }
        else
        {
            if(Game.rooms['sim'].controller.level==2)
            {
                var CS1 = Game.rooms['sim'].createConstructionSite(Game.spawns['Spawn1'].pos.x - 2,Game.spawns['Spawn1'].pos.y,STRUCTURE_EXTENSION);
                var CS2 = Game.rooms['sim'].createConstructionSite(Game.spawns['Spawn1'].pos.x - 3,Game.spawns['Spawn1'].pos.y,STRUCTURE_EXTENSION);
                var CS3 = Game.rooms['sim'].createConstructionSite(Game.spawns['Spawn1'].pos.x - 4,Game.spawns['Spawn1'].pos.y,STRUCTURE_EXTENSION);
                var CS4 = Game.rooms['sim'].createConstructionSite(Game.spawns['Spawn1'].pos.x - 5,Game.spawns['Spawn1'].pos.y,STRUCTURE_EXTENSION);
                var CS5 = Game.rooms['sim'].createConstructionSite(Game.spawns['Spawn1'].pos.x - 6,Game.spawns['Spawn1'].pos.y,STRUCTURE_EXTENSION);
            }
            else
            {
                console.log('Creación de extensiones: Se requiere controlador de nivel 2');
            }
        }
    }
    
 /** SPAWNEO AUTOMÁTICO DE CREEPS **/

    if(builders.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        console.log('Creando Constructor: ' + newName);
        
    }    

    if(upgraders.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        console.log('Creando Upgrader: ' + newName);
    }

    if(harvesters.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Creando Cosechador: ' + newName);
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '???' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}