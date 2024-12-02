const scrollOntoItem = (item) => {
    item.scrollIntoView({
        behavior: 'instant',
        block: 'start',
        inline: 'nearest',
    });
}

export {scrollOntoItem}
