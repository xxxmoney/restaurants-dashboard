const scrollOntoItem = (item) => {
    item.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center',
    });
}

export {scrollOntoItem}
