class footballTeam{
    constructor(clubName, country){
this.clubName = clubName;
this.country = country;
this.invitedPlayers = [];
    }
    newAdditions(footballPlayers){
for (const player of footballPlayers) {
    let [name, age, playerValue] = player.split('/');
    age = Number(age);
    playerValue = Number(playerValue);
    let obj = {
        name,
        age,
        playerValue
    }

let currentPlayer = this.invitedPlayers.find( x=> x.name == name);
    if(currentPlayer){
if(currentPlayer.playerValue < obj.playerValue){
    currentPlayer.playerValue = obj.playerValue;
}
    }
    this.invitedPlayers.push(obj)
}
    let buff = 'You successfully invite '
    for (const name of this.invitedPlayers) {
        buff += `${name.name}, `
    }
    buff = buff.substring(0,buff.length - 2)
    buff += '.'
    return buff
}
signContract(selectedPlayer){
let [name, playerOffer] = selectedPlayer.split('/');
let currPlayer = this.invitedPlayers.find(x=>x.name == name);
if(!currPlayer){
    throw `${name} is not invited to the selection list!`
}
if(currPlayer.playerValue > playerOffer){
    let diff = currPlayer.playerValue - playerOffer;
    return `The manager's offer is not enough to sign a contract with ${currPlayer.name}, ${diff} million more are needed to sign the contract!`
}else{
    currPlayer.playerValue = 'Bought';
    return `Congratulations! You sign a contract with ${currPlayer.name} for ${playerOffer} million dollars.`
}

}
ageLimit(name, age){
    let currPlayer = this.invitedPlayers.find(x => x.name == name);
    if(!currPlayer){
        throw new Error(`${name} is not invited to the selection list!`)
    }else if(currPlayer.age < age){
        if((age - currPlayer.age) < 5){
            return `${currPlayer.name} will sign a contract for ${age - currPlayer.age} years with ${this.clubName} in ${this.country}!`
        }else if((age - currPlayer.age) >= 5){
            return `${currPlayer.name} will sign a full 5 years contract for ${this.clubName} in ${this.country}!`
        }
    }else{
        return `${currPlayer.name} is above age limit!`
    }
}

transferWindowResult() {
    let result = [];

    result.push("Players list:");
    this.invitedPlayers.sort((a, b) => a.name - b.name).map(e => result.push(`Player ${e.name}-${e.playerValue}`));
    return result.join("\n");
}
    }
    let fTeam = new footballTeam("Barcelona", "Spain"); 

    console.log(fTeam.newAdditions(["Kylian Mbappé/23/160", "Lionel Messi/35/50", "Pau Torres/25/52"])); 
    
    console.log(fTeam.signContract("Kylian Mbappé/240")); 
    
    console.log(fTeam.ageLimit("Kylian Mbappé", 30)); 
    
    console.log(fTeam.transferWindowResult());  