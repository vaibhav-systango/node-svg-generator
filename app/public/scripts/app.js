import React from 'react';
const DOMParser = require('xmldom').DOMParser;
const helper = require('../../utils/helper');
let cardDataFromXML = null;
let playerInitailDetail = [];
let percentageVsLefty = '';
let percentageVsRighty = '';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    const employeeXml = this.props.data; //'<player><details><player_type>BATTER</player_type><hand>R</hand><first>HANK</first><last>AARON</last><year>2019</year><team>HOF</team><lefty>29% VS.LEFTY PITCHERS</lefty><power_left>Power-N</power_left><fielding>rf-1(-2)e6/ 1b-4e7/ cf-2e6 </fielding><righty>71% VS.RIGHTY PITCHERS</righty><power_right>Power-N</power_right><stealing>stealing-(C) *6/- (17-6)</stealing><bunting>bunting-C</bunting><hitnrun>hit &amp; run-B</hitnrun><running>running 1-16</running></details><cols><col><lines><line ><display><span line=\"1\">◆2-<b>HR</b> 1-8</span><span line=\"2\"> fly (lf) B 9-20</span></display><crapline>◆2-HR 1-8 fly (lf) B 9-20</crapline></line><line ><display><span line=\"1\">▼3-<b>SINGLE (lf)</b></span></display><crapline>▼3-SINGLE (lf)</crapline></line><line roll=\"4\"><display><span line=\"1\">4-gb (2b) <u>C</u></span></display><crapline>gb (2b) C</crapline></line><line roll=\"5\"><display><span line=\"1\">5-<b>TR</b> 1-4</span><span line=\"2\"> <b>DO </b> 5-20</span></display><triple roll=\"1-4\">1</triple><crapline>DO  5-20</crapline></line><line roll=\"6\"><display><span line=\"1\">6-<b>HOMERUN</b></span></display><homerun injury=\"1\">1</homerun></line><line roll=\"7\"><display><span line=\"1\">7-<b>WALK</b></span></display><walk injury=\"1\">1</walk></line><line roll=\"8\"><display><span line=\"1\">8-popout (ss)</span></display><crapline>popout (ss)</crapline></line><line ><display><span line=\"1\">◆9-<b>HOMERUN</b></span></display><crapline>◆9-HOMERUN</crapline></line><line roll=\"10\"><display><span line=\"1\">10-<b>HOMERUN</b></span></display><homerun injury=\"1\">1</homerun></line><line ><display><span line=\"1\">◆11-fly (lf) B&amp;#003F;</span></display><crapline>◆11-fly (lf) B?</crapline></line><line roll=\"12\"><display><span line=\"1\">12-fly (cf) A</span></display><crapline>fly (cf) A</crapline></line></lines></col><col><lines><line roll=\"2\"><display><span line=\"1\">2-<b>HBP</b></span><span line=\"2\"> plus injury</span></display><crapline>HBP plus injury</crapline></line><line ><display><span line=\"1\">Δ3-gb (3b) B</span><span line=\"2\"><i> <b>SI*</b> 1-5</i></span><span line=\"3\"><i> lo 6-20</i></span></display><crapline>Δ3-gb (3b) B SI 1-5 lineout 6-20</crapline></line><line roll=\"4\"><display><span line=\"1\">4-gb (3b) A</span></display><crapline>gb (3b) A</crapline></line><line roll=\"5\"><display><span line=\"1\">5-gb (ss) A</span></display><crapline>gb (ss) A</crapline></line><line roll=\"6\"><display><span line=\"1\">6-<b>SINGLE (cf)</b></span></display><crapline>SINGLE (cf)</crapline></line><line roll=\"7\"><display><span line=\"1\">7-<b>DO**</b> 1-4</span><span line=\"2\"> <b>SI**</b> 5-20</span></display><double roll=\"1-4\">1</double><single roll=\"5-20\">1</single></line><line roll=\"8\"><display><span line=\"1\">8-gb (p) B</span></display><crapline>gb (p) B</crapline></line><line roll=\"9\"><display><span line=\"1\">9-fly (cf) B&amp;#003F;</span></display><crapline>fly (cf) B?</crapline></line><line ><display><span line=\"1\">▼10-fly (rf) B&amp;#003F;</span></display><crapline>▼10-fly (rf) B?</crapline></line><line roll=\"11\"><display><span line=\"1\">11-gb (1b) <u>C</u></span></display><crapline>gb (1b) C</crapline></line><line roll=\"12\"><display><span line=\"1\">12-lo (3b) max</span></display><crapline>lo (3b) max</crapline></line></lines></col><col><lines><line roll=\"2\"><display><span line=\"1\">2-gb (2b) <u>C</u></span></display><crapline>gb (2b) C</crapline></line><line roll=\"3\"><display><span line=\"1\">3-gb (ss) A</span></display><crapline>gb (ss) A</crapline></line><line roll=\"4\"><display><span line=\"1\">4-strikeout</span></display><strikeout injury=\"1\">1</strikeout></line><line roll=\"5\"><display><span line=\"1\">5-<b>SI*</b> 1-10</span><span line=\"2\"> lo (3b) 11-20</span></display><single roll=\"1-10\">1</single><crapline>lo (3b) 11-20</crapline></line><line roll=\"6\"><display><span line=\"1\">6-<b>SINGLE**</b></span></display><single injury=\"1\">1</single></line><line roll=\"7\"><display><span line=\"1\">7-gb (ss) A+</span></display><crapline>gb (ss) A+</crapline></line><line roll=\"8\"><display><span line=\"1\">8-<b>WALK</b></span></display><walk injury=\"1\">1</walk></line><line roll=\"9\"><display><span line=\"1\">9-strikeout</span></display><strikeout injury=\"1\">1</strikeout></line><line roll=\"10\"><display><span line=\"1\">10-fly (lf) B&amp;#003F;</span></display><crapline>fly (lf) B?</crapline></line><line roll=\"11\"><display><span line=\"1\">11-<b>HR</b> 1-15</span><span line=\"2\"> fly (lf) B 16-20</span></display><homerun roll=\"1-15\">1</homerun><crapline>fly (lf) B 16-20</crapline></line><line ><display><span line=\"1\">◆12-fly (lf) B&amp;#003F;</span></display><crapline>◆12-fly (lf) B?</crapline></line></lines></col><col><lines><line ><display><span line=\"1\">◆2-<b>HR</b> 1-8</span><span line=\"2\"> fly (lf) B 9-20</span></display><crapline>◆2-HR 1-8 fly (lf) B 9-20</crapline></line><line ><display><span line=\"1\">▼3-<b>SINGLE (rf)</b></span></display><crapline>▼3-SINGLE (rf)</crapline></line><line roll=\"4\"><display><span line=\"1\">4-gb (3b) B</span></display><crapline>gb (3b) B</crapline></line><line roll=\"5\"><display><span line=\"1\">5-<b>DO**</b> 1</span><span line=\"2\"> <b>SI**</b> 2-20</span></display><crapline>DO 1 SI 2-20</crapline></line><line roll=\"6\"><display><span line=\"1\">6-<b>HOMERUN</b></span></display><homerun injury=\"1\">1</homerun></line><line roll=\"7\"><display><span line=\"1\">7-<b>TR</b> 1</span><span line=\"2\"> <b>DO </b> 2-20</span></display><crapline>TR 1 DO  2-20</crapline></line><line roll=\"8\"><display><span line=\"1\">8-popout (ss)</span></display><crapline>popout (ss)</crapline></line><line ><display><span line=\"1\">◆9-<b>HOMERUN</b></span></display><crapline>◆9-HOMERUN</crapline></line><line roll=\"10\"><display><span line=\"1\">10-<b>HR</b> 1-19</span><span line=\"2\"> <b>TR</b> 20</span></display><homerun roll=\"1-19\">1</homerun><crapline>TR 20</crapline></line><line ><display><span line=\"1\">◆11-fly (lf) B&amp;#003F;</span></display><crapline>◆11-fly (lf) B?</crapline></line><line roll=\"12\"><display><span line=\"1\">12-fly (cf) A</span></display><crapline>fly (cf) A</crapline></line></lines></col><col><lines><line roll=\"2\"><display><span line=\"1\">2-<b>HBP</b></span><span line=\"2\"> plus injury</span></display><crapline>HBP plus injury</crapline></line><line roll=\"3\"><display><span line=\"1\">3-gb (p) B</span></display><crapline>gb (p) B</crapline></line><line ><display><span line=\"1\">▼4-gb (p) B</span></display><crapline>▼4-gb (p) B</crapline></line><line roll=\"5\"><display><span line=\"1\">5-gb (3b) A</span></display><crapline>gb (3b) A</crapline></line><line roll=\"6\"><display><span line=\"1\">6-<b>SINGLE (lf)</b></span></display><crapline>SINGLE (lf)</crapline></line><line roll=\"7\"><display><span line=\"1\">7-<b>SINGLE**</b></span></display><single injury=\"1\">1</single></line><line roll=\"8\"><display><span line=\"1\">8-gb (ss) A</span></display><crapline>gb (ss) A</crapline></line><line roll=\"9\"><display><span line=\"1\">9-gb (ss) A+</span></display><crapline>gb (ss) A+</crapline></line><line roll=\"10\"><display><span line=\"1\">10-gb (2b) <u>C</u></span></display><crapline>gb (2b) C</crapline></line><line roll=\"11\"><display><span line=\"1\">11-gb (1b) <u>C</u></span></display><crapline>gb (1b) C</crapline></line><line roll=\"12\"><display><span line=\"1\">12-lo (3b) max</span></display><crapline>lo (3b) max</crapline></line></lines></col><col><lines><line roll=\"2\"><display><span line=\"1\">2-gb (2b) <u>C</u></span></display><crapline>gb (2b) C</crapline></line><line roll=\"3\"><display><span line=\"1\">3-gb (ss) A+</span></display><crapline>gb (ss) A+</crapline></line><line roll=\"4\"><display><span line=\"1\">4-fly (rf) B&amp;#003F;</span></display><crapline>fly (rf) B?</crapline></line><line roll=\"5\"><display><span line=\"1\">5-<b>SI*</b> 1-8</span><span line=\"2\"> lo (3b) 9-20</span></display><single roll=\"1-8\">1</single><crapline>lo (3b) 9-20</crapline></line><line roll=\"6\"><display><span line=\"1\">6-<b>WALK</b></span></display><walk injury=\"1\">1</walk></line><line roll=\"7\"><display><span line=\"1\">7-fly (cf) B&amp;#003F;</span></display><crapline>fly (cf) B?</crapline></line><line roll=\"8\"><display><span line=\"1\">8-<b>WALK</b></span></display><walk injury=\"1\">1</walk></line><line roll=\"9\"><display><span line=\"1\">9-strikeout</span></display><strikeout injury=\"1\">1</strikeout></line><line roll=\"10\"><display><span line=\"1\">10-strikeout</span></display><strikeout injury=\"1\">1</strikeout></line><line ><display><span line=\"1\">Δ11-fly (lf) B&amp;#003F;</span><span line=\"2\"><i> <b>SI*</b> 1-5</i></span><span line=\"3\"><i> lo 6-20</i></span></display><crapline>Δ11-fly (lf) B? SI 1-5 lineout 6-20</crapline></line><line ><display><span line=\"1\">◆12-fly (lf) B&amp;#003F;</span></display><crapline>◆12-fly (lf) B?</crapline></line></lines></col></cols></player>';
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(employeeXml, "text/xml");
    const xmlSrc = xmlDoc.documentElement.childNodes;
    cardDataFromXML = this.getRowData(xmlSrc);
    this.getPlayerDetails(xmlSrc);
  }

  getPlayerDetails(xmlSrc){
    let details =xmlSrc[0].childNodes;
    playerInitailDetail=[];
    for (let i = 0; i < details.length ;i++) {
        let keyStr=details[i].nodeName;
        if(typeof details[i].childNodes[0] != 'undefined') {
          playerInitailDetail[keyStr]=details[i].childNodes[0].nodeValue;
        }
        else {
          playerInitailDetail[keyStr] = '';
        }
    }

    if (playerInitailDetail['player_type'] != 'undefined') {
      if (playerInitailDetail['player_type'] == 'PITCHER') {
        let splitResults = playerInitailDetail['numbers_left'].split('%');
        percentageVsLefty =splitResults[0]+'% AGAINST LEFT-HANDED BATTERS';
        splitResults = playerInitailDetail['righty'].split('%');
        percentageVsRighty=splitResults[0]+'% AGAINST RIGHT-HANDED BATTERS';
      }
      else if (playerInitailDetail['player_type'] == 'BATTER') {
        let splitResults = playerInitailDetail['lefty'].split('%');
        percentageVsLefty = splitResults[0]+'% AGAINST LEFT-HANDED PITCHERS';
        splitResults = playerInitailDetail['righty'].split('%');
        percentageVsRighty =splitResults[0]+'% AGAINST RIGHT-HANDED PITCHERS';
      }
    }  
  } 

  getRowData = (xmlSrc) => {
    let regInteger = /^\d+$/;
    let maxNumberOfLine = 0;
    let playerDetailDataLandscapeArray = [];
    let cols = xmlSrc[1].childNodes;
    let lineCount = 0;
    for (let i = 0; i < cols.length; i++) {
      let col = cols[i].childNodes;
      for (let j = 0; j < col.length; j++) {
        let lines = col[j].childNodes
        lineCount = lines.length;
        for (let k = 0; k < lines.length; k++) {
          let line = lines[k].childNodes
          let display = line[0].childNodes;
          if (display.length > 1) {
            lineCount = lineCount + (display.length - 1);
          }
        }
      }
      if (lineCount > maxNumberOfLine) {
        maxNumberOfLine = lineCount;
      }
    }
    //COLS
    for (let i = 0; i < cols.length; i++) {
      let col = cols[i].childNodes
      let landscapeRowData = [];
      //COL
      for (let j = 0; j < col.length; j++) {
        let lines = col[j].childNodes
        //LINES
        for (let k = 0; k < lines.length; k++) {
          let line = lines[k].childNodes
          let display = line[0].childNodes;
          //LINE
          for (let l = 0; l < display.length; l++) {
            let text1 = '', text2 = '', text3 = '';
            let span = display[l].childNodes;
            if (span.length == 1 && span[0].nodeName != 'i') {
              let textStr = '';
              textStr = span[0].nodeValue
              textStr = helper.getUnescapedString(textStr);
              let res = textStr.split("-");
              if (res.length > 1 && res[0].length < 4) {
                text1 = res[0] + '-'
                textStr = textStr.replace(text1, '')
              }
              res = textStr.split(" ");
              if (res.length > 1 && (res[res.length - 1].indexOf('-') > -1 || regInteger.test(res[res.length - 1]))) {
                text3 = res[res.length - 1]
                text2 = textStr.replace(text3, '')
              }
              else {
                text2 = textStr
              }
              text1 = text1.replace(/^\s+|\s+$/g, '');
              text2 = text2.replace(/^\s+|\s+$/g, '');
              text3 = text3.replace(/^\s+|\s+$/g, '');
              let textSymbol = text1.split("")[0];
              if (typeof textSymbol != 'undefined') {
                var num = parseInt(textSymbol);
                if (regInteger.test(JSON.stringify(num)) == false) {
                  text1 = text1.replace(textSymbol, '');
                }
                else {
                  textSymbol = '';
                }
              }
              landscapeRowData.push(helper.addLanscapeCardDetailColumn(textSymbol, text1, text2, text3, false, k, j, l, ''))
            }
            else {
              let isBold = false;
              let isUnderlined = false;
              let isItalic = false;
              if (span[0].nodeName == 'i') {
                isItalic = true;
                let span2 = span[0].childNodes;
                span = span2;
              }
              for (let m = 0; m < span.length; m++) {
                let textStr = '';
                if (span[m].nodeName == 'b') {
                  textStr = span[m].childNodes[0].nodeValue;
                  text2 = helper.getUnescapedString(textStr);
                  isBold = true;
                  isUnderlined = false;
                }
                else if (span[m].nodeName == 'u') {
                  textStr = span[m].childNodes[0].nodeValue;
                  text3 = helper.getUnescapedString(textStr);
                  isBold = false;
                  isUnderlined = true;
                }
                else {
                  if (isBold == true) {
                    textStr = span[m].nodeValue;
                    if (m == 0) {
                      text1 = helper.getUnescapedString(textStr);
                    }
                    else {
                      text3 = helper.getUnescapedString(textStr);
                    }
                  }
                  else if (isItalic == true) {
                    //isBold=true;
                    textStr = span[0].nodeValue
                    textStr = helper.getUnescapedString(textStr);
                    let res = textStr.split(" ");
                    text1 = res[0];
                    text2 = res[1] + '';
                    text3 = res[2];
                  }
                  else {
                    textStr = span[0].nodeValue
                    textStr = helper.getUnescapedString(textStr);
                    let res = textStr.split("-");
                    if (res.length == 2) {
                      text1 = res[0] + '-';
                      text2 = res[1];
                    }
                    else {
                      text1 = ' ';
                      text2 = res[0];
                    }
                  }
                }
              }
              text1 = text1.replace(/^\s+|\s+$/g, '');
              text2 = text2.replace(/^\s+|\s+$/g, '');
              text2 = text2.replace('DOUBlE', 'DOUBLE')
              text3 = text3.replace(/^\s+|\s+$/g, '');
              let textSymbol = text1.split("")[0];
              if (typeof textSymbol != 'undefined') {
                let num = parseInt(textSymbol);
                if (regInteger.test(JSON.stringify(num)) == false) {
                  text1 = text1.replace(textSymbol, '');
                }
                else {
                  textSymbol = '';
                }
              }
              if (isBold == true) {
                landscapeRowData.push(helper.addLanscapeCardDetailColumnWithCustomText(textSymbol, text1, text2, text3, 'bold', isItalic, k, j, l, ''))
              }
              else if (isUnderlined == true) {
                landscapeRowData.push(helper.addLanscapeCardDetailColumnWithCustomText(textSymbol, text1, text2, text3, 'underline', isItalic, k, j, l, ''))
              }
              else {
                landscapeRowData.push(helper.addLanscapeCardDetailColumn(textSymbol, text1, text2, text3, isItalic, k, j, l, ''))
              }
            }
          }
        }
      }
      playerDetailDataLandscapeArray.push(landscapeRowData)
    }
    return playerDetailDataLandscapeArray;
  }

  render() {
    return (
      <span>
      <svg
      version="1.1"
      id="Dark_theme"
      x="0px"
      y="0px"
      viewBox="-246 73.3 466.5 470"
      style={{ enableBackground: 'new -246 73.3 466.5 470' }}
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      >
      <defs>
        <style type="text/css">@import url(http://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700,800);</style>
      </defs>
      <g id="Stats">
        <g id="_1">
        <g id="Table_header">
          <g id="Against_left_hand">
          <path
            id="Rectangle_4_copy_9"
            style={{fill:'#3D4462',fillOpacity:0.57,'stroke':'#2E344B'}}
            d="M-239.8,73.5h460l0,0v470.8l0,0h-460c-3.3,0-6-2.7-6-6V79.5
            C-245.8,76.2-243.1,73.5-239.8,73.5z"
          />
          <path id="Rectangle_4_copy_7" style={{fill:'#CDE6FF'}} d="M-244.8,113.5h464l0,0v429.8l0,0h-458c-3.3,0-6-2.7-6-6V113.5L-244.8,113.5z" />
          <path id="Rectangle_4_copy_8" style={{fill:'#CDE6FF'}} d="M-244.8,113.5h464l0,0v429.8l0,0h-458c-3.3,0-6-2.7-6-6V113.5L-244.8,113.5z" />
          <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="-244.75" y1="233.625 " x2="-90.75" y2="233.625" gradientTransform="matrix(1 0 0 -1 0 562)">
            <stop offset="0" style={{ stopColor: '#FDFEFF' }} />
            <stop offset="1" style={{ stopColor: '#BCDEFF' }} />
          </linearGradient>
          <path style={{fill:"url('#SVGID_1_')"}} d="M-244.8,113.5h154l0,0v429.8l0,0h-147c-3.9,0-7-3.1-7-7V113.5L-244.8,113.5z" />
          <linearGradient id="Rectangle_588_copy_1_" gradientUnits="userSpaceOnUse" x1="-89.75" y1="233.625" x2="64.25" y2="233.625" gradientTransform="matrix(1 0 0 -1 0 562)">
            <stop offset="0" style={{ stopColor: '#FDFEFF' }} />
            <stop offset="1" style={{ stopColor: '#BCDEFF' }} />
          </linearGradient>
          <rect id="Rectangle_588_copy" x="-89.8" y="113.5" style={{fill:"url('#Rectangle_588_copy_1_')"}} width="154" height="429.8" />
          <linearGradient id="Rectangle_588_copy_2_1_" gradientUnits="userSpaceOnUse" x1="65.25" y1="233.625" x2="219.25" y2="233.625" gradientTransform="matrix(1 0 0 -1 0 562)">
            <stop offset="0" style={{ stopColor: '#FDFEFF' }} />
            <stop offset="1" style={{ stopColor: '#BCDEFF' }} />
          </linearGradient>
          <rect id="Rectangle_588_copy_2" x="65.3" y="113.5" style={{fill:"url('#Rectangle_588_copy_2_1_')"}} width="154" height="429.8" />
          </g>
        </g>
        </g>
      </g>
      <text transform={playerInitailDetail['player_type'] == 'PITCHER' ? "matrix(1 0 0 1 -150 98.5)" : "matrix(1 0 0 1 -235 98.5)" } style={{fill:'#FFFFFF', fontFamily:'Montserrat', fontSize:'13px'}}>{percentageVsLefty}</text>
      <text transform="matrix(1 0 0 1 133.75 98.5)" style={{fill:'#FFFFFF', fontFamily:'Montserrat', fontSize:'13px'}}>{playerInitailDetail['power_left']}</text>
      <text transform="matrix(1 0 0 1 -175.6792 134.5)" style={{fill:'#5D678E', fontFamily:'Montserrat', fontSize:'16px'}}>
      {playerInitailDetail['player_type'] == 'PITCHER' ? 4 : 1 }</text>
      <text transform="matrix(1 0 0 1 -22.8211 135.5)" style={{fill:'#5D678E', fontFamily:'Montserrat', fontSize:'16px'}}>{playerInitailDetail['player_type'] == 'PITCHER' ? 5 : 2 }</text>
      <text transform="matrix(1 0 0 1 137.8456 134.8333)" style={{fill:'#5D678E', fontFamily:'Montserrat', fontSize:'16px'}}>{playerInitailDetail['player_type'] == 'PITCHER' ? 6 : 3 }</text>
      { helper.renderColumn(cardDataFromXML, 0, -211.5) }
      { helper.renderColumn(cardDataFromXML, 1, -60.5) }
      { helper.renderColumn(cardDataFromXML, 2, 101.1667) }
      <line style={{opacity:0.2,fill:'none',stroke:'#2E344B'}} x1="-244.8" y1="142" x2="220.5" y2="142"/>
    </svg>
    
    <svg
      version="1.1"
      id="Dark_theme"
      x="0px"
      y="0px"
      viewBox="-246 75 466.5 470"
      style={{ enableBackground: 'new -246 75 466.5 470' }}
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      >
      <defs>
        <style type="text/css">@import url(http://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700,800);</style>
      </defs>
      <g id="Stats">
        <g id="_1">
        <g id="Table_header">
          <g id="Against_left_hand">
          <path
            id="Rectangle_4_copy_9"
            style={{fill:'#DB0040',fillOpacity:0.57,'stroke':'#2E344B'}}
            d="M220,81v458c0,3.3-2.7,6-6,6h-460l0,0V75l0,0h460C217.3,75,220,77.7,220,81z"
          />
          <path id="Rectangle_4_copy_7" style={{fill:'#CDE6FF'}} d="M219,115v423c0,3.3-2.7,6-6,6h-458l0,0V115l0,0H219L219,115z" />
          <path id="Rectangle_4_copy_8" style={{fill:'#CDE6FF'}} d="M219,115v423c0,3.3-2.7,6-6,6h-458l0,0V115l0,0H219L219,115z" />
          <linearGradient id="SVGID_1_1" gradientUnits="userSpaceOnUse" x1="-1227.0001" y1="327.5" x2="-1073.0001"  y2="327.5" gradientTransform="matrix(-1 0 0 1 -1008.0001 2)">
            <stop offset="0" style={{ stopColor: '#FFC4D5' }} />
            <stop offset="1" style={{ stopColor: '#FDFEFF' }} />
          </linearGradient>
          <path style={{fill:"url('#SVGID_1_1')"}} d="M219,115v422c0,3.9-3.1,7-7,7H65l0,0V115l0,0H219L219,115z" />
          <linearGradient id="Rectangle_588_copy_1_1" gradientUnits="userSpaceOnUse" x1="-1072.0001" y1="327.5" x2="-918.0001" y2="327.5" gradientTransform="matrix(-1 0 0 1 -1008.0001 2)">
            <stop offset="0" style={{ stopColor: '#FFC4D5' }} />
            <stop offset="1" style={{ stopColor: '#FDFEFF' }} />
          </linearGradient>
          <rect id="Rectangle_588_copy" x="-90" y="115" style={{fill:"url('#Rectangle_588_copy_1_1')"}} width="154" height="429" />
          <linearGradient id="Rectangle_588_copy_2_1_1" gradientUnits="userSpaceOnUse" x1="-917.0001" y1="327.5" x2="-763.0001" y2="327.5" gradientTransform="matrix(-1 0 0 1 -1008.0001 2)">
            <stop offset="0" style={{ stopColor: '#FFC4D5' }} />
            <stop offset="1" style={{ stopColor: '#FDFEFF' }} />
          </linearGradient>
          <rect id="Rectangle_588_copy_2" x="-245" y="115" style={{fill:"url('#Rectangle_588_copy_2_1_1')"}} width="154" height="429" />
          </g>
        </g>
        </g>
      </g>
      <text transform={playerInitailDetail['player_type'] == 'PITCHER' ? "matrix(1 0 0 1 -150 100)" : "matrix(1 0 0 1 -235 100)" } style={{fill:'#FFFFFF', fontFamily:'Montserrat', fontSize:'13px'}}>{percentageVsRighty}</text>
      <text transform="matrix(1 0 0 1 133.5 100)" style={{fill:'#FFFFFF', fontFamily:'Montserrat', fontSize:'13px'}}>{playerInitailDetail['power_right']}</text>
      <text transform="matrix(1 0 0 1 -175.9292 136)" style={{fill:'#DB0040', fontFamily:'Montserrat', fontSize:'16px'}}>
      {playerInitailDetail['player_type'] == 'PITCHER' ? 4 : 1 }</text>
      <text transform="matrix(1 0 0 1 -23.0711 137)" style={{fill:'#DB0040', fontFamily:'Montserrat', fontSize:'16px'}}>{playerInitailDetail['player_type'] == 'PITCHER' ? 5 : 2 }</text>
      <text transform="matrix(1 0 0 1 137.5956 136.3333)" style={{fill:'#DB0040', fontFamily:'Montserrat', fontSize:'16px'}}>{playerInitailDetail['player_type'] == 'PITCHER' ? 6 : 3 }</text>
      { helper.renderColumn(cardDataFromXML, 3, -211.5) }
      { helper.renderColumn(cardDataFromXML, 4, -60.5) }
      { helper.renderColumn(cardDataFromXML, 5, 101.1667) }
    	<line style={{opacity:0.2,fill:'none',stroke:'#2E344B'}} x1="-244.8" y1="143.4" x2="220.5" y2="143.4"/>  
    </svg>
  </span>
  )
  }
}
