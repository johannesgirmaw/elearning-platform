function CustomText(props: any) {
    const { text } = props;

    return <span className="relative inline-block text-custom_orange-900 before:absolute before:content-[''] before:sm:bg-shape_4 before:bg-center before:bg-cover 
            before:bg-no-repeat before:w-32 before:h-3 before:left-1/2 before:-bottom-3 before:-translate-x-1/2" > {text}
    </span>;
}

export default CustomText;