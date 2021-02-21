import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';
import classNames from 'classnames';
import { Typography } from 'antd';
import { TitleProps } from 'antd/lib/typography/Title';

export interface SectionProps extends HtmlHTMLAttributes<HTMLDivElement> {
  verticalPad?: 'md' | 'sm';
  size?: 'hero' | undefined;
  title?: string;
}

export const Section: FunctionComponent<SectionProps> = ({
  children,
  className: customizeClassName,
  verticalPad,
  size,
  title: titleProp,
  ...rest
}) => {
  const wrapperClasses = classNames([
    `content-section`,
    {
      [`hero`]: size === 'hero',
      [`v-pad-small`]: verticalPad === 'sm',
      [`v-pad-medium`]: verticalPad === 'md',
    },
    customizeClassName,
  ]);

  return (
    <section className={wrapperClasses} {...rest}>
      {children}
    </section>
  );
};

export interface SectionTitleProps extends TitleProps {
  verticalPad?: 'sm' | 'md';
}

export const SectionTitle: FunctionComponent<SectionTitleProps> = ({
  className: customizeClassName,
  verticalPad,
  ...props
}) => {
  const wrapperClasses = classNames([
    `section-title`,
    {
      [`v-pad-small`]: verticalPad === 'sm',
      [`v-pad-medium`]: verticalPad === 'md',
    },
    customizeClassName,
  ]);

  return <Typography.Title className={wrapperClasses} level={2} {...props} />;
};
