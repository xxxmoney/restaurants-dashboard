const scrollOntoItem = (item) => {
    item.scrollIntoView({
        behavior: 'instant',
        block: 'start',
        inline: 'center',
    });
}

export {scrollOntoItem}
