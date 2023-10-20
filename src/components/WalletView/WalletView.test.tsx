import 'module-alias/register';

//import {cleanup, fireEvent, render, waitFoFor } '@testing-library/react';
//import { renderHook, RenderOptions, RenderResult } from '@testing-library/react-hooks'

import {cleanup, render, waitFor } from '@testing-library/react';

import WalletView from "."

afterEach(cleanup);

/*
it("returns more than one article from provider without error", () => {
  const {queryByCardText, getByCardText} = render(
    <Provider value={NewsApi}><NewsApiView/></Provider>
  );
  
  const {result} = renderHook(() => useQuery<ArticleQuery>({ query: ArticleQuerySchema }));
  const { data, fetching, error } = result;

  expect(fetching).toBeFalsy();
  expect(error?.message.length).toBeGreaterThan(0);
  expect(data).toHaveProperty("Article");
  expect(data?.Articles).toBeGreaterThan(0);

  expect(queryByCardText(/No News/i)).toBeTruthy();
  fireEvent.click(getByCardText(/No News/i));

});
*/

it("renders without crashing", async() => {
  //const { queryByTestId, asFragment } = render(<WalletView/>);
  const { asFragment } = render(<WalletView/>);

  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
    //expect(queryByTestId('Articles').childNodes.length).toBeGreaterThan(0)
  });
});
