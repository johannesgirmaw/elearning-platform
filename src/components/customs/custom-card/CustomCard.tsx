function CustomCard(props: any) {
    const { light = false } = props;

    return (
        <div className={props.className + " border border-solid rounded-xl px-2 sm:px-8 py-5 transition-all duration-300 ease-in group "  + (
            light ? " hover:border-custom_orange-100 hover:bg-custom_orange-100 " :
                " hover:border-custom_orange-900 "
        )}>
            {props.children}
        </div>
    );
}

export default CustomCard;