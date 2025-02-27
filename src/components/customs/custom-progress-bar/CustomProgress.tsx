import { Progress, ProgressProps,  } from 'antd';


function CustomProgress(props: any) {
    const { passStrength, className } = props;

    const conicColors: ProgressProps['strokeColor'] = {
        '1.3%': '#ffccc7',
        '50%': '#ffe58f',
        '100%': '#87d068',
      };
   


    return (
        <Progress percent={passStrength} strokeColor={conicColors} className={"w-full md:w-60" + className} />
    );
}

export default CustomProgress;