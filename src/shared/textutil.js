class TextUtil 
{
    static getLineSegmentFormula(rayEmitter, virtualRay, box)
    {
        if(box.isBoxHit() && rayEmitter.getChainedRayNum() > 1)
        {
            let leftStr = char(virtualRay.charNum);
            let charNumArray = rayEmitter.getChainedCharNums();
            let rightStr = "";
            for (let i = 0; i < charNumArray.length; i++) 
            {
                if(i != 0)
                {
                rightStr+= '+';
                }
                rightStr += char(charNumArray[i]);
            }
            return(leftStr + " = " + rightStr);
        }
        return "";
    }

    static setSlideText(str)
    {
        push();
        noStroke();
        textSize(20);
        fill('black');
        textStyle(NORMAL);
        textWrap(WORD);
        text(str, 30, 30, width-50);
        pop();
    }

    static setNextPageHyperLink(nextPageNumStr)
    {
        let a = createA('page-'+ nextPageNumStr+'.html', 'Next Page >');
        a.position(700, 550);
    }

    static setPrevPageHyperLink(prevPageNumStr)
    {
        let a = createA('page-'+ prevPageNumStr+'.html', '< Previous Page');
        a.position(30, 550);
    }

    static setFooterText(str)
    {
        push();
        noStroke();
        textSize(20);
        fill('black');
        textStyle(NORMAL);
        textWrap(WORD);
        text(str, 30, 520, width-50);
        pop();
    }
}