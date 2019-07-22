import React from 'react';

export function setUnderlineStyle(textparseData){
    return {
        marginLeft: 2,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000000'
    }
}

export function getPlayerDetails(xmlSrc){
    let details = xmlSrc[0].childNodes;
    let playerInitailDetail = {};
    let portraitCardBottomDetail = {};
    for (let i = 0; i < details.length; i++) {
        let keyStr = details[i].nodeName;
        if (typeof details[i].childNodes[0] != 'undefined') {
            playerInitailDetail[keyStr] = details[i].childNodes[0].nodeValue;
        }
        else {
            playerInitailDetail[keyStr] = '';
        }
    }
    if (playerInitailDetail['player_type'] != 'undefined') {
        if (playerInitailDetail['player_type'] == 'PITCHER') {

            if (typeof playerInitailDetail["throws"] != 'undefined') {
                portraitCardBottomDetail["throws"] = playerInitailDetail["throws"];
            }

            if (typeof playerInitailDetail["bunting"] != 'undefined') {
                portraitCardBottomDetail["bunting"] = playerInitailDetail["bunting"];
            }

            if (typeof playerInitailDetail["numbers_right"] != 'undefined') {
                let numberString = playerInitailDetail['numbers_right'].split(' ');
                portraitCardBottomDetail["numbers_right1"] = numberString[0] + '  ' + numberString[1];
                portraitCardBottomDetail["numbers_right2"] = numberString[2];
                portraitCardBottomDetail["numbers_right3"] = numberString[3];
            }

            if (typeof playerInitailDetail["hold"] != 'undefined') {
                portraitCardBottomDetail["hold"] = playerInitailDetail["hold"];
            }
        }
        else if (playerInitailDetail['player_type'] == 'BATTER') {

            if (typeof playerInitailDetail["stealing"] != 'undefined') {
                let stealingTag = playerInitailDetail["stealing"].split(')');
                portraitCardBottomDetail["stealing1"] = stealingTag[0] + ')';
                portraitCardBottomDetail["stealing2"] = stealingTag[1] + ')';
            }

            if (typeof playerInitailDetail["bunting"] != 'undefined') {
                portraitCardBottomDetail["bunting"] = playerInitailDetail["bunting"];
            }

            if (typeof playerInitailDetail["hitnrun"] != 'undefined') {
                portraitCardBottomDetail["hitnrun"] = playerInitailDetail["hitnrun"];
            }

            if (typeof playerInitailDetail["running"] != 'undefined') {
                portraitCardBottomDetail["running"] = playerInitailDetail["running"];
            }

        }
    }
    return {
        playerInitailDetail,
        portraitCardBottomDetail
    }
}

export function getStealingString1(parseData){
    const { playerInitailDetail } = parseData;
    let stealing = playerInitailDetail['stealing'].split(' ');
    let splitResult = stealing[0].split('stealing-')
    return splitResult;
}

export function getStealingString2(parseData){
    const { playerInitailDetail } = parseData;
    let splitResult = '    ';
    let stealing = playerInitailDetail['stealing'].split(' ');
    for (let i = 1; i < stealing.length; i++) {
        splitResult = splitResult + '' + stealing[i];
    }
    return splitResult;
}

export function getBuntingString(parseData){
    const { playerInitailDetail } = parseData;
    let bunting = playerInitailDetail['bunting'];
    let splitResult = bunting.split('bunting-');
    return splitResult;
}

export function getRunningString(parseData){
    const { playerInitailDetail } = parseData;
    let running = playerInitailDetail['running'];
    let splitResult = running.split('running');
    return splitResult;
}

export function getFeildingString(parseData){
    const { playerInitailDetail } = parseData;
    let fielding = playerInitailDetail['fielding'];
    return fielding;
}

export function getNumberRightString3(parseData){
    let splitResult = '';
    const { playerInitailDetail } = parseData;
    let numberString = playerInitailDetail['numbers_right'].split(' ');
    splitResult = numberString[3].replace('@', '●');
    return splitResult;
}

export function getPitcherBuntingString2(parseData){
    const { playerInitailDetail } = parseData;
    let splitResult = '';
    let bunting = playerInitailDetail['bunting'].split(' ');
    if (bunting.length > 1) {
        splitResult = bunting[1].replace('@', '●');
    }
    return splitResult;
}

export function getNumberRightString2(parseData){
    const { playerInitailDetail } = parseData;
    let splitResult = '';
    let numberString = playerInitailDetail['numbers_right'].split(' ');
    splitResult = numberString[2];
    return splitResult;
}

export function getNumberRightString1(parseData){
    let splitResult = '';
    const { playerInitailDetail } = parseData;
    let numberString = playerInitailDetail['numbers_right'].split(' ');
    splitResult = numberString[0] + '    ' + numberString[1];
    return splitResult;
}

export function getPitcherBuntingString1(parseData){
    let splitResult = '';
    const { playerInitailDetail } = parseData;
    let bunting = playerInitailDetail['bunting'].split(' ');
    splitResult = bunting[0];
    return splitResult;
}

export function getHitNRunString(parseData){
    const { playerInitailDetail } = parseData;
    let hitnrun = playerInitailDetail['hitnrun'];
    let splitResult = hitnrun.split('hit & run-');
    return splitResult;
}

export function getUnescapedString(str){
    let textStr = str;
    if (str != null) {
      textStr = str.replace(/&/g, '');
      textStr = textStr.replace(/;/g, '');
      textStr = textStr.replace('#003E', ">");
      textStr = textStr.replace('#003F', "?");
      textStr = textStr.replace('#0023', "#");
      textStr = textStr.replace('#0024', "$");
      textStr = textStr.replace('#0040', "@");
      textStr = textStr.replace('#2666', "♦");
      textStr = textStr.replace('#0394', "Δ");
      textStr = textStr.replace('#03A9', "Ω");
      textStr = textStr.replace('#2662', "♢");
      textStr = textStr.replace('#2207', "∇");
    }
    textStr = unescape(textStr)
    return textStr;
}

export function addLanscapeCardDetailColumnWithCustomText(textSymbol, text1, text2, text3, customEffect, isItalic, rowNumber, selectedColumn, lineNo, highlightBGColor){
    let fontStyleValue = (isItalic == true) ? 'italic' : 'normal';
    selectedColumn = selectedColumn + 1;
    rowNumber = rowNumber + 2
    let dotsymbolText = '';
    if (text2.indexOf('●') > -1) {
      dotsymbolText = '●';
      text2 = text2.replace('●', '');
    }
    text1 = (text1 == '') ? ' ' : text1
    if (text3 == '') {
      return (<tspan x={ lineNo ? '12' : ''} style={{height:60}}><tspan x={textSymbol !== '' ? -12 : ''}>{textSymbol}</tspan><tspan>{text1}</tspan><tspan style={{fontStyle: isItalic == true ? 'italic' : 'normal', fontWeight: 'bold'}}>{text2}</tspan><tspan>{dotsymbolText}</tspan></tspan>)
    } else {
      if (customEffect == 'bold') {
        return (<tspan x={ lineNo ? '12' : ''} style={{ height: 60 }}><tspan x={textSymbol !== '' ? -12 : ''} style={{fontStyle: isItalic == true ? 'italic' : 'normal'}} x={textSymbol !== '' ? -12 : ''}>{textSymbol}</tspan><tspan>{text1}</tspan><tspan style={{fontWeight: 'bold'}}>{text2}</tspan><tspan>{dotsymbolText}</tspan><tspan x="80" style={{fontStyle: isItalic == true ? 'italic' : 'normal', fontWeight: 'bold', textAlign: 'left', color: "#000000"}}>{text3}</tspan></tspan>)
      }
      else if (customEffect == 'underline') {
        return (
          <tspan x={ lineNo ? '12' : ''} style={{height:60}} style={{flexDirection: 'row'}}><tspan style={{ color: '#000000', textAlign: 'right', fontStyle: fontStyleValue }} x={textSymbol !== '' ? -12 : ''}>{textSymbol}</tspan><tspan>{text1}</tspan><tspan>{text2}</tspan><tspan>{dotsymbolText}</tspan><tspan style={{ textDecorationLine: 'underline', textDecorationStyle: 'solid', textDecorationColor: '#000000', paddingBottom: 2, fontStyle: fontStyleValue }}>{text3}</tspan></tspan>
        )
      }
    }
  }

  export function addLanscapeCardDetailColumn(textSymbol, text1, text2, text3, isItalic, rowNumber, selectedColumn, lineNo, highlightBGColor){
    selectedColumn = selectedColumn + 1;
    rowNumber = rowNumber + 2
    let dotsymbolText = '';
    if (text2.indexOf('●') > -1) {
      dotsymbolText = '●';
      text2 = text2.replace('●', '');
    }
    let fontStyleValue = (isItalic == true) ? 'italic' : 'normal';
    text1 = (text1 == '') ? ' ' : text1
    if (text3 == '') {
      return (
        <tspan x={ lineNo ? '12' : ''} style={{ flexDirection: 'row', height: 60 }}><tspan style={{ fontStyle: fontStyleValue }} x={textSymbol !== '' ? -12 : ''}>{textSymbol}</tspan><tspan>{text1}</tspan><tspan style={{ fontStyle: fontStyleValue }}>{text2}</tspan><tspan>{dotsymbolText}</tspan><tspan x={80} style={{ fontStyle: fontStyleValue, fontWeight: 'bold' }}>{text3}</tspan></tspan>
      )
    } else {
      return (
        <tspan x={ lineNo ? '12' : ''} style={{ flexDirection: 'row', height: 60 }}><tspan style={{ fontStyle: fontStyleValue }} x={textSymbol !== '' ? -12 : ''}>{textSymbol}</tspan><tspan>{text1}</tspan><tspan style={{ fontStyle: fontStyleValue }}>{text2}</tspan><tspan>{dotsymbolText}</tspan><tspan x={80} style={{ fontStyle: fontStyleValue, fontWeight: 'bold' }}>{text3}</tspan></tspan>
      )
    }
  }
  
  export function renderColumn(cardDataFromXML, colNumber,colPosition){
    return cardDataFromXML[colNumber].map((value, index) => {
        return (
        <text key={index} transform={`matrix(1 0 0 1 ${colPosition} ${162.1667 + (23 * index)})`}>
          <tspan x="0" y="0" style={{fill:'#11172C', fontFamily:'Montserrat', fontSize:'13px'}}>{cardDataFromXML[colNumber][index]}</tspan>
        </text>)
      });
  }

