import InfoSection from "../../../components/InfoSection/InfoSection";
import SiteFooter from "../../../components/SiteFooter/SiteFooter";
import SiteHeader from "../../../components/SiteHeader/SiteHeader";

export default function Pricing() {
  return (
    <>
      <SiteHeader />
      <main>
        <InfoSection>
          <>
            <h1>Pricing</h1>
            <p>
              During the private alpha stage, CommonText is completely free to
              use. This is to ensure that we can fix the most glaring bugs and
              get your valuable feedback early on.
            </p>
            <p>
              Come time for the public beta, we plan on charging $19/mo. This
              price is based mainly on the relative value of the product and the
              cost of delivering it to you. This price may be adjusted in the
              future.
            </p>
          </>
        </InfoSection>
      </main>
      <SiteFooter />
    </>
  );
}
