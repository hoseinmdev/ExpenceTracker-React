const digitHider = (number, min, max) => {
    const digitHided = number.slice(min, max) + "... "
    return ( digitHided );
}
 
export default digitHider;