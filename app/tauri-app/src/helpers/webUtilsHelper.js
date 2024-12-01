const scrollOntoItem = (frame, item) => {
    const itemRectangle = item.getBoundingClientRect();
    const elementTop = itemRectangle.top;
    const frameRectangle = frame.document.body.getBoundingClientRect();
    const frameTop = frameRectangle.top;

    const scrollTop = elementTop - frameTop;
    frame.document.body.scrollTo(0, scrollTop);
}

export {scrollOntoItem}
