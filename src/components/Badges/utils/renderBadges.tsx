import { Badge } from "@/components/Badge";

import type { TBadgesProps } from "../Badges.types";

const MAX_BADGES = 10;

export const renderBadges = ({ options, selected, ...props }: TBadgesProps) => {
  if (selected.length === options.length && options.length > 5) {
    return <Badge value='All' />;
  }
  if (selected.length <= MAX_BADGES) {
    return selected.map((val) => (
      <Badge
        {...props}
        key={val}
        value={val}
      />
    ));
  }
  return [
    ...selected.slice(0, MAX_BADGES).map((val) => (
      <Badge
        {...props}
        key={val}
        value={val}
      />
    )),
    <Badge
      key='more-badge'
      isMore
      value={`+${selected.length - MAX_BADGES} more`}
    />,
  ];
};