import { List, ListProps } from "antd";
import React, { FunctionComponent } from "react";
import { Link } from "../Link";
import { socialIcons } from "./socialIcons";

export interface SocialListProps extends ListProps<any> {
  gutter?: number;
}

export const SocialList: FunctionComponent<SocialListProps> = ({
  dataSource,
  gutter,
  grid: gridProp,
  ...rest
}) => {
  const grid = gridProp || {
    gutter: gutter || 16,
    column: dataSource && dataSource.length,
  };

  return (
    <List
      className="footer-social-list"
      grid={grid}
      dataSource={dataSource}
      renderItem={(item) => {
        const Icon: any = socialIcons[item.icon];
        return (
          <List.Item className="footer-social-list-item">
            <Link href={item.href}>
              {Icon && <Icon style={{ fontSize: "2rem" }} />}
            </Link>
          </List.Item>
        );
      }}
      bordered={false}
    ></List>
  );
};
