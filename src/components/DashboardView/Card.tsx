import * as React from 'react'

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Button, Card } from 'react-daisyui';
import { Doughnut } from 'react-chartjs-2';

type DatasetItems = {
    label: string
    data: Array<number>
    backgroundColor: Array<string>
    borderWidth: number
};

type Dataset = {
    labels: Array<string>,
    datasets: Array<DatasetItems>
}

export type DatasetProps = React.HTMLAttributes<HTMLDivElement> & typeof defaultProps & {
    className: string
    title: string
    data: Array<Dataset>
};

const defaultProps = {
    title: 'Example GraphCard',
    data: [{
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        },
      ],
    }]
};

const GraphCard = React.forwardRef<HTMLElement, DatasetProps>(
    ({...props }): JSX.Element => {
        const {title, data, children, className} = props;

        return (
            <div 
                aria-label="GraphCard"
                className={twMerge('card', 
                    clsx('lg:card-side', 'bg-base-100', 'shadow-x1'), 
                    className)}>
                <figure>
                    <Doughnut data={data[0]}/>
                </figure>
                <div className={twMerge("card-body")}>
                    <Card.CardTitle tag="h2">{title}</Card.CardTitle>
                    {children?}
                    <Card.CardAction className='justify-end'>
                        <Button size="lg" color={true}>Learn More</Button>
                    </Card.CardAction>
                </div>
            </div>
        )
    }
);


export default GraphCard;