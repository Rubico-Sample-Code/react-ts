import React, { useRef } from 'react';

import './styles.css';
import { BookmarkItemType } from '../../containers/BookmarksContainer';
import EmptyPageMessage from '../Global/EmptyPageMessage';
import ItemsMasonry from '../ItemsMasonry';

interface Proptypes {
  list: Array<BookmarkItemType>;
  isLoading: boolean;
  children: (data: BookmarkItemType, i: number) => React.ReactElement;
  onLoadMore: () => void;
  masonryKey?: string;
}

export default function Bookmarks({
  list,
  isLoading,
  children,
  onLoadMore,
  masonryKey
}: Proptypes) {
  const ref = useRef<HTMLDivElement>();

  let el;
  if (!list.length) {
    if (!isLoading) {
      el = (
        <EmptyPageMessage header={{}}>
          <span>Looks like there are no results.</span>
        </EmptyPageMessage>
      );
    }
  } else {
    el = (
      <ItemsMasonry<BookmarkItemType>
        masonryKey={masonryKey}
        containerRef={ref}
        items={list}
        onLoadMore={onLoadMore}
        loading={isLoading}
        overscanBy={2}
        columnWidth={350}
        columnGutter={18}
      >
        {children}
      </ItemsMasonry>
    );
  }
  return (
    <section className="bookmarks" ref={ref}>
      {el}
    </section>
  );
}
