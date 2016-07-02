import { Button } from 'react-toolbox/lib/button';

import { Pagination } from '../Pagination';


export default ({ theme, options, action, totalText }) => {
  const totalCount = options.total_count || options.totalCount;
  const totalPages = options.total_pages || options.totalPages;
  const showPagination = !!totalCount && totalPages > 1;
  return (
    <div className={theme.footerFow}>
      {
        showPagination &&
          <Pagination total={totalPages} current={options.page} action={action} />
      }
      {
        totalText &&
          <Button className={theme.total} disabled label={`${totalText} : ${totalCount}`} />
      }
    </div>
  );
};
