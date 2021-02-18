import React, { ComponentType, FunctionComponent, HTMLAttributes } from "react";
import classNames from "classnames";
import { Typography } from "antd";

export interface SectionProps {
  className?: string;
  sectionProps?: HTMLAttributes<HTMLDivElement>;
  contentProps?: HTMLAttributes<HTMLDivElement>;
  verticalPad?: "md" | "sm";
  size?: "hero" | undefined;
  title?: string;
  footer?: string;
}

export const Section: FunctionComponent<SectionProps> = ({
  children,
  className: customizeClassName,
  contentProps,
  verticalPad,
  sectionProps,
  size,
  title: titleProp,
  footer: footerProp,
  ...rest
}) => {
  const wrapperClasses = classNames([
    `section`,
    {
      [`hero`]: size === "hero",
      [`v-pad-small`]: verticalPad === "sm",
      [`v-pad-medium`]: verticalPad === "md",
    },
    customizeClassName,
  ]);
  const innerClasses = classNames([`section-content`]);

  return (
    <section className={wrapperClasses} {...sectionProps}>
      {titleProp && (
        <Typography.Title className="section-title" level={2}>
          {titleProp}
        </Typography.Title>
      )}
      <div className={innerClasses} {...contentProps}>
        {children}
      </div>
    </section>
  );
};
