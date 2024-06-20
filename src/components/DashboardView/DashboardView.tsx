import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import GraphCard from './GraphCard';

export type DashboardViewProps = React.HTMLAttributes<HTMLDivElement>;

const DashboardView = React.forwardRef<HTMLDivElement, DashboardViewProps>(
(   
    {className, children, ...props},
    ref
  ): React.JSX.Element => {
    const styles = twMerge(
        className,
        clsx({
            "font-size": "18pt"
        })
    );

    return (
        <div aria-label='DashboardView' ref={ref} className={styles} {...props}>
            {children}
        </div>
    )
});

export default Object.assign(DashboardView, {
    GraphCard: GraphCard
});
