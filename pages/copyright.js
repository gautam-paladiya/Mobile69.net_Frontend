import React, { Component } from "react";
import Layout from "../components/Layout";

export default class copyright extends Component {
  render() {
    return (
      <Layout canonical="copyright">
        <section
          className="static-page"
          style={{
            backgroundColor: " #fff",
            color: " #000",
            maxWidth: 800,
            padding: 16,
            margin: "auto",
          }}
        >
          <h4>Procedure for Making Claims of Copyright Infringement</h4>
          <p>
            If you want unauthorized content removed from Mobile69, please read
            the instructions below:
          </p>
          <p>
            It is Mobile69's policy to work with copyright owners to protect
            their intellectual property and to insure that unauthorized content
            is not distributed via the Mobile69 network.
          </p>
          <p>
            If you believe in good faith that any material provided through the
            Service infringes upon your copyright, you may send notice to
            Mobile69 requesting that the material or access to the material be
            removed, pursuant to the Digital Millennium Copyright Act ("DMCA"),
            by providing our Copyright Agent with the following information in
            writing (see 17 U.S.C 512(c)(3) and
            <a className="ul" href="https://www.loc.gov/copyright">
              http://www.loc.gov/copyright
            </a>
            for further details). The notice must include all of the following:
          </p>
          <ol className="numeric">
            <li>
              A physical or electronic signature of a person authorized to act
              on behalf of the owner of an exclusive right that is allegedly
              infringed. (Simply typing your name at the end of an email or
              electronically transmitted letter will suffice as an "electronic
              signature.")
            </li>
            <li>
              Identification of the copyrighted work claimed to have been
              infringed, or, if multiple copyrighted works at a single online
              site are covered by a single notification, a representative list
              of such works at that site. (You can give us a list of the
              copyrighted works you own and a brief description of the works,
              attach a copy of the works or send us the URL for a website that
              displays the works you own.)
            </li>
            <li>
              Identification of the material that is claimed to be infringing or
              to be the subject of infringing activity and that is to be removed
              or access to which is to be disabled, and information reasonably
              sufficient to permit the service provider to locate the material.
              (Identify the infringing material by sending us the URL or item ID
              for the content you claim is infringing and identify the portion
              that is infringing. Please note that item ID usually can be found
              on the page where the material is previewed.)
            </li>
            <li>
              Information reasonably sufficient to permit Mobile69 to contact
              you, such as an address, telephone number, and, if available, an
              electronic mail address at which the complaining party may be
              contacted.
            </li>
            <li>
              A statement that you "have a good faith belief that use of the
              material in the manner complained of is not authorized by the
              copyright owner, its agent, or the law." (You can simply copy this
              statement and put it in your letter, as long as the statement is
              true.)
            </li>
            <li>
              A statement that "the information in the notification is accurate,
              and under penalty of perjury, that the complaining party is
              authorized to act on behalf of the owner of an exclusive right
              that is allegedly infringed." (You can simply copy this statement
              and put it in your letter, as long as the statement is true.)
            </li>
          </ol>
          <p>
            Without such information Mobile69 cannot reasonably comply with its
            obligations to intellectual property owners and to the members of
            the Mobile69 community.
          </p>
          <p>
            Please note that under Section 512(f) of the Copyright Act, any
            person who knowingly materially misrepresents that material or
            activity was removed or disabled by mistake or misidentification may
            be subject to liability.
          </p>
          <p>
            Be assured that Mobile69 is designed to fully respect intellectual
            property rights. Mobile69 enforces and will continue to enforce its
            Terms of Service which strictly prohibit the public posting of
            copyrighted material to which the poster does not have rights and
            together with the aforementioned activities Mobile69 brings further
            protection to content owners seeking to prohibit the distribution of
            their copyrighted works, while offering a user the best
            collaborative mobile platform.
          </p>
          <p>
            Please also be advised that we enforce a policy that provides for
            the termination in appropriate circumstances of subscribers who are
            repeat infringers.
          </p>
          <p>
            Please note that Mobile69 operates globally and had adopted this
            policy to meet the many legal requirements it must comply with.
          </p>
          <p>
            For more information about the Mobile69 Terms of Service, please see
            <a className="ul" href="/terms">
              Mobile69.net/terms
            </a>
          </p>
          <p>
            Mobile69 Copyright Agent contact information:
            <br />
            <br />
            Copyright Agent <br />
            Mobile69,
            <br />
            <br />
            <br />
            Email: [Mobile69] [@] [gmail] [dot] [com]
          </p>
          <h4>Counter Notification</h4>
          <p>
            If you believe in good faith that a notice of copyright infringement
            has been wrongly filed against you, you may send Mobile69 a
            counter-notice. All notices with respect to Mobile69 should be sent
            to the Mobile69 Copyright Agent. Mobile69 suggests that you consult
            your legal advisor before filing a notice or counter-notice. You
            expressly acknowledge and agree that Mobile69 shall not be liable to
            you under any circumstances for declining to replace material. Also,
            be aware that there can be penalties for false claims under the
            DMCA.
          </p>
        </section>
      </Layout>
    );
  }
}
