const scrollOntoItem = (item) => {
    item.scrollIntoView({
        behavior: 'instant',
        block: 'start',
        inline: 'end',
    });
}

export {scrollOntoItem}
