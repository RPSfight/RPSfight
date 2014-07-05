var rockAtt;
var rockPro;
var paperAtt;
var paperPro;
var scissorsAtt;
var scissorsPro;
var averagePro;
var erockAtt;
var erockPro;
var epaperAtt;
var epaperPro;
var escissorsAtt;
var escissorsPro;
var eaveragePro;
var pLife;
var pMaxLife;
var eLife;
var eMaxLife;
var computerList = new Array();
var playerList = new Array();
var n;

function initFight(pMax, eMax, eList, pList) {
	pLife = pMaxLife = pMax;
	eLife = eMaxLife = eMax;
	computerList = eList;
	playerList = pList;
	averagePro = Math.round((rockPro + paperPro + scissorsPro) / 3);
	eaveragePro = Math.round((erockPro + epaperPro + escissorsPro) / 3);
	n == 0;
}

function nextFight() {
	var pDamage;
	var eDamage;
	var p = playerList[n];
	var e = computerList[n];
	switch(p) {
		case "rock":
			switch(e) {
				case "rock":
					break;
				case "paper":
					pDamage = epaperAtt * epaperAtt / rockPro;
					break;
				case "scissors":
					eDamage = rockAtt * rockAtt / escissorsPro;
					break;
				default:
					eDamage = rockAtt * rockAtt / averagePro;
			}
			break;
		case "paper":
			switch(e) {
				case "paper":
					break;
				case "scissors":
					pDamage = escissorsAtt * escissorsAtt / paperPro;
					break;
				case "rock":
					eDamage = paperAtt * paperAtt / escissorsPro;
					break;
				default:
					eDamage = paperAtt * paperAtt / eaveragePro;
			}
			break;
		case "scissors":
			switch(e) {
				case "rock":
					pDamage = erockAtt * erockAtt / scissorsPro;
					break;
				case "scissors":
					break;
				case "paper":
					eDamage = scissorsAtt * scissorsAtt / epaperPro;
					break;
				default:
					eDamage = scissorsAtt * scissorsAtt / eaveragePro;
			}
			break;
		default:
			switch(e) {
				case "rock":
					pDamage = erockAtt * erockAtt / averagePro;
					break;
				case "scissors":
					pDamage = escissorsAtt * escissorsAtt / averagePro;
					break;
				case "paper":
					pDamage = epaperAtt * epaperAtt / averagePro;
					break;
			}
	}
	n++;
	pLife-=pDamage;
	eLife-=eDamage;
	if(pLife<0){
		pLife=0;
	}else if(eLife<0){
		eLife=0;
	}
}

function rockAtt(i) {
	rockAtt = i;
}

function getRockAtt() {
	return rockAtt;
}

function rockPro(i) {
	rockPro = i;
}

function getRockPro() {
	return rockPro;
}

function paperAtt(i) {
	paperAtt = i;
}

function getPaperAtt() {
	return paperAtt;
}

function paperPro(i) {
	paperPro = i;
}

function getPaperPro() {
	return paperPro;
}

function scissorsAtt(i) {
	scissorsAtt = i;
}

function getScissorsAtt() {
	return scissorsPro;
}

function scissorsPro(i) {
	scissorsPro = i;
}

function getScissorsPro() {
	return scissorsPro;
}

function erockAtt(i) {
	erockAtt = i;
}

function geteRockAtt() {
	return erockAtt;
}

function erockPro(i) {
	erockPro = i;
}

function geteRockPro() {
	return erockPro;
}

function epaperAtt(i) {
	epaperAtt = i;
}

function getePaperAtt() {
	return epaperAtt;
}

function epaperPro(i) {
	epaperPro = i;
}

function getePaperPro() {
	return epaperPro;
}

function escissorsAtt(i) {
	escissorsAtt = i;
}

function geteScissorsAtt() {
	return scissorsPro;
}

function escissorsPro(i) {
	escissorsPro = i;
}

function geteScissorsPro() {
	return escissorsPro;
}

function pLife(i) {
	pLife = i;
}

function getPLife() {
	return pLife;
}

function pMaxLife(i) {
	pMaxLife = i;
}

function getPMaxLife() {
	return pMaxLife;
}

function eLife(i) {
	eLife = i;
}

function getELife() {
	return eLife;
}

function eMaxLife(i) {
	eMaxLife = i;
}

function getEMaxLife() {
	return eMaxLife;
}