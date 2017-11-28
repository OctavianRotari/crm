export function segStyle(span, slots){
    let per = (span / slots) * 100 + '%';
    return { WebkitFlexBasis: per, flexBasis: per, maxWidth: per } ;// IE10/11 need max-width. flex-basis doesn't respect box-sizing
}

