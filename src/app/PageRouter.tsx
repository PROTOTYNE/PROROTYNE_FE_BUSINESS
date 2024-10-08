import { Suspense, lazy } from "react";
import {
  BrowserRouter as RootRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppStyles from "./AppStyles";
import AuthRouter from "./AuthRouter";

import { Loading } from "@/entities";
import { NavigationBar, Header } from "@/widget";
import { PAGE_URL } from "@/shared";

const Home = lazy(() => import("@/pages/home/HomePage"));
const MyCompany = lazy(() => import("@/pages/mycompany/MyCompanyPage"));
const NotFound = lazy(() => import("@/pages/notfound/NotFoundPage"));
const Test = lazy(() => import("@/pages/notfound/Test"));

const ProductInfo = lazy(
  () => import("@/pages/product/information/InformationPage")
);
const ProductReview = lazy(() => import("@/pages/product/review/ReviewPage"));

const InvestmentInfo = lazy(
  () => import("@/pages/investment/information/InformationPage")
);
const InvestmentManagement = lazy(
  () => import("@/pages/investment/management/ManagementPage")
);
const InvestmentSchedule = lazy(
  () => import("@/pages/investment/schedule/SchedulePage")
);

const SignIn = lazy(() => import("@/pages/auth/signin/SignInPage"));
const SignUp = lazy(() => import("@/pages/auth/signup/SignUpPage"));

const PageRouter = () => (
  <Suspense fallback={<Loading />}>
    <RootRouter>
      <AppStyles />
      <AuthRouter>
        <Routes>
          <Route path={PAGE_URL.SignIn} element={<SignIn />} />
          <Route path={PAGE_URL.SignUp} element={<SignUp />} />
          <Route path={PAGE_URL.Test} element={<Test />} />
          <Route element={<Header />}>
            <Route>
              <Route index element={<Navigate to={PAGE_URL.Home} replace />} />
              <Route path={PAGE_URL.Home} element={<Home />} />
              <Route path={PAGE_URL.MyCompany} element={<MyCompany />} />
              <Route path="*" element={<NotFound />} />
              <Route
                path={PAGE_URL.InvestmentSchedule}
                element={<InvestmentSchedule />}
              />
            </Route>

            <Route element={<NavigationBar state={"PRODUCT"} />}>
              <Route path={PAGE_URL.ProductInfo} element={<ProductInfo />} />
              <Route
                path={PAGE_URL.ProductReview}
                element={<ProductReview />}
              />
            </Route>

            <Route element={<NavigationBar state={"INVESTMENT"} />}>
              <Route
                path={PAGE_URL.InvestmentInfo}
                element={<InvestmentInfo />}
              />
              <Route
                path={PAGE_URL.InvestmentManagement + "/*"}
                element={<InvestmentManagement />}
              />
            </Route>
          </Route>
        </Routes>
      </AuthRouter>
    </RootRouter>
  </Suspense>
);

export default PageRouter;
