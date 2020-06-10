import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

// Environtment
import { environment }                      from '../../environments/environment'

// Package
import { NgxPermissionsGuard } from 'ngx-permissions';

import { AdminComponent }        from './admin.component';

import { AuthGuard } from '../auth/auth.guard'

const routes: Routes = [
    {   path: '',             
        component: AdminComponent,
        canActivate : [AuthGuard],
        data            : {
            permissions : {
              only      : 'view-user',
              redirectTo: 'dashboard'
            }
        },
        canLoad: [NgxPermissionsGuard],
        children: [
            { path : '',                            redirectTo  : 'dashboard'},
            
            { path : 'dashboard',                   loadChildren: () => import("./component/dashboard/dashboard.module").then(m => m.DashboardModule)},
            // { path : 'dashboard',                   loadChildren: "./component/dashboard/dashboard.module#DashboardModule"},
            { path : 'agent',                       loadChildren: () => import("./component/insurance/master/agent/agent.module").then(m => m.AgentModule) },
            { path : 'api-consumer',                loadChildren: () => import("./component/insurance/master/api-consumer/api-consumer.module").then(m => m.ApiConsumerModule) },
            { path : 'bank',                        loadChildren: () => import("./component/insurance/master/bank/bank.module").then(m => m.BankModule) },
            { path : 'banner',                      loadChildren: () => import("./component/banner-management/banner.module").then(m => m.BannerModule) },
            { path : 'benefit',                     loadChildren: () => import("./component/insurance/master/benefit-management/benefit.module").then(m => m.BenefitModule) },
            { path : 'benefit-level',               loadChildren: () => import("./component/insurance/master/benefit-level-management/benefit-level.module").then(m => m.BenefitLevelModule) },
            { path : 'booking-policy',              loadChildren: () => import("./component/insurance/master/booking-policy/booking-policy.module").then(m => m.BookingPolicyModule) },
            
            { path : 'cms-about',                   loadChildren: () => import("./component/cms-management/cms-about/cms-about.module").then(m => m.CmsAboutModule) },
            { path : 'about-banner',                loadChildren: () => import("./component/cms-management/cms-about/cms-about-management/cms-about-banner/cms-about-banner.module").then(m => m.CmsAboutBannerModule) },
            { path : 'about-influencer',            loadChildren: () => import("./component/cms-management/cms-about/cms-about-management/cms-about-influencer/cms-about-influencer.module").then(m => m.CmsAboutInfluencerModule) },
            { path : 'about-influencer-bio',        loadChildren: () => import("./component/cms-management/cms-about/cms-about-management/cms-about-influencer-bio/cms-about-influencer-bio.module").then(m => m.CmsAboutInfluencerBioModule) },
            { path : 'about-sosmed',                loadChildren: () => import("./component/cms-management/cms-about/cms-about-management/cms-about-sosmed/cms-about-sosmed.module").then(m => m.CmsAboutSosmedModule) },
            { path : 'cms-homepage',                loadChildren: () => import("./component/cms-management/cms-homepage/cms-homepage.module").then(m => m.CmsHomepageModule) },
            { path : 'homepage-our-product',        loadChildren: () => import("./component/cms-management/cms-homepage/cms-homepage-management/cms-homepage-our-product/cms-homepage-our-product.module").then(m => m.CmsHomepageOurProductModule) },
            { path : 'homepage-why-our-product',    loadChildren: () => import("./component/cms-management/cms-homepage/cms-homepage-management/cms-homepage-why-our-product/cms-homepage-why-our-product.module").then(m => m.CmsHomepageWhyOurProductModule) },
            { path : 'homepage-how-to-buy',         loadChildren: () => import("./component/cms-management/cms-homepage/cms-homepage-management/cms-homepage-how-to-buy/cms-homepage-how-to-buy.module").then(m => m.CmsHomepageHowToBuyModule) },
            { path : 'homepage-story-behind-insurance',loadChildren: () => import("./component/cms-management/cms-homepage/cms-homepage-management/cms-homepage-story-behind-insurance/cms-homepage-story-behind-insurance.module").then(m => m.CmsHomepageStoryBehindInsuranceModule) },
            { path : 'homepage-all-insurance',      loadChildren: () => import("./component/cms-management/cms-homepage/cms-homepage-management/cms-homepage-all-insurance/cms-homepage-all-insurance.module").then(m => m.CmsHomepageAllInsuranceModule) },
            { path : 'cms-my-avrist',               loadChildren: () => import("./component/cms-management/cms-my-avrist/cms-my-avrist.module").then(m => m.CmsMyAvristModule) },
            { path : 'my-avrist-banner',            loadChildren: () => import("./component/cms-management/cms-my-avrist/cms-my-avrist-management/cms-my-avrist-banner/cms-my-avrist-banner.module").then(m => m.CmsMyAvristBannerModule) },
            
            { path : 'campaign',                    loadChildren: () => import("./component/campaign-management/campaign.module").then(m => m.CampaignModule) },
            { path : 'campaign-sales',              loadChildren: () => import("./component/campaign-sales-management/campaign-sales.module").then(m => m.CampaignSalesModule) },
            { path : 'claim',                       loadChildren: () => import("./component/insurance/claim/claim-management/claim.module").then(m => m.ClaimModule) },
            { path : 'currency',                    loadChildren: () => import("./component/insurance/master/currency/currency.module").then(m => m.CurrencyModule) },
            { path : 'customer',                    loadChildren: () => import("./component/insurance/customer/customer-management/customer.module").then(m => m.CustomerModule) },
            { path : 'email-pic',                   loadChildren: () => import("./component/insurance/master/emailpic/emailpic.module").then(m => m.EmailpicModule) },
            { path : 'event',                       loadChildren: () => import("./component/event-management/event.module").then(m => m.EventModule) },
            { path : 'event/category',              loadChildren: () => import("./component/event-category-management/event-category.module").then(m => m.EventCategoryModule) },
            { path : 'faq',                         loadChildren: () => import("./component/faq/faq.module").then(m => m.FaqModule) },
            { path : 'health-setup',                loadChildren: () => import("./component/insurance/master/health-product-setup/health-product-setup.module").then(m => m.HealthProductSetupModule) },
            { path : 'identity',                    loadChildren: () => import("./component/insurance/master/identity/identity.module").then(m => m.IdentityModule) },
            { path : 'integration-txt',             loadChildren: () => import("./component/insurance/integration/integration-policy-master/integration-policy-master.module").then(m => m.IntegrationPolicyMasterModule) },
            { path : 'integration-txt-payment',     loadChildren: () => import("./component/insurance/integration/txt-payment/txt-payment.module").then(m => m.TxtPaymentModule) },
            { path : 'job-class',                   loadChildren: () => import("./component/insurance/master/job-class/job-class.module").then(m => m.JobClassModule) },
            { path : 'job-class-mapping',           loadChildren: () => import("./component/insurance/master/job-class-mapping/job-class-mapping.module").then(m => m.JobClassMappingModule) },
            { path : 'job-occupation',              loadChildren: () => import("./component/insurance/master/joboccupation/joboccupation.module").then(m => m.JobOccupationModule) },
            { path : 'job-occupation2',             loadChildren: () => import("./component/insurance/master/joboccupation2/joboccupation2.module").then(m => m.JobOccupation2Module) },
            { path : 'log',                         loadChildren: () => import("./component/log-management/log.module").then(m => m.LogModule) },
            { path : 'marital-status',              loadChildren: () => import("./component/insurance/master/marital-status/marital-status.module").then(m => m.MaritalStatusModule) },
            { path : 'menu',                        loadChildren: () => import("./component/menu-management/menu.module").then(m => m.MenuModule) },
            { path : 'member-get-member',           loadChildren: () => import("./component/member-get-member-management/member-get-member.module").then(m => m.MemberGetMemberModule) },
            { path : 'modal-factor',                loadChildren: () => import("./component/insurance/master/modal-factor-management/modal-factor.module").then(m => m.ModalFactorModule) },
            { path : 'master-setup-rate',           loadChildren: () => import("./component/insurance/master/master-setup-rate/master-setup-rate.module").then(m => m.MasterSetupRateModule) },
            { path : 'master-formula',              loadChildren: () => import("./component/insurance/master/master-formula/master-formula.module").then(m => m.MasterFormulaModule) },
            { path : 'payment-method',              loadChildren: () => import("./component/insurance/master/payment-method-management/payment-method.module").then(m => m.PaymentMethodModule) },
            { path : 'permission',                  loadChildren: () => import("./component/credential/permission-management/permission-management.module").then(m => m.PermissionModule) },
            { path : 'policy',                      loadChildren: () => import("./component/insurance/policy/policy-management/policy.module").then(m => m.PolicyModule) },
            { path : 'product-category',            loadChildren: () => import("./component/insurance/product/product-category/product-category.module").then(m => m.ProductCategoryModule) },
            { path : 'product',                     loadChildren: () => import("./component/insurance/product/product-management/product-management.module").then(m => m.ProductManagementModule) },
            { path : 'product-approval',            loadChildren: () => import("./component/insurance/product/product-approval/product-approval.module").then(m => m.ProductApprovalModule) },
            { path : 'product-archived',            loadChildren: () => import("./component/insurance/product/product-archived/product-archived.module").then(m => m.ProductArchivedModule) },
            { path : 'relationship',                loadChildren: () => import("./component/insurance/master/relationship/relationship.module").then(m => m.RelationshipModule) },
            { path : 'relationship-beneficiary',    loadChildren: () => import("./component/insurance/master/relationship-beneficiary/relationship-beneficiary.module").then(m => m.RelationshipBeneficiaryModule) },
            { path : 'renewal-recharge',            loadChildren: () => import("./component/insurance/master/renewal-recharge/renew-recharge.module").then(m => m.RenewRechargeModule) },
            { path : 'reports-cta',                 loadChildren: () => import("./component/reports/cta/cta.module").then(m => m.CtaModule) },
            { path : 'reports/visitor',             loadChildren: () => import("./component/reports/visitor/visitor.module").then(m => m.VisitorModule) },
            { path : 'reports-member-get-member',   loadChildren: () => import("./component/reports/member-get-member-report/member-get-member-report.module").then(m => m.MemberGetMemberReportModule) },
            { path : 'reports-epolicy-delivery',    loadChildren: () => import("./component/reports/epolicy-delivery/epolicy-delivery.module").then(m => m.EpolicyDeliveryModule) },
            { path : 'reports-transaction',         loadChildren: () => import("./component/reports/transaction/transaction.module").then(m => m.TransactionModule) },
            { path : 'rider-setup',                 loadChildren: () => import("./component/insurance/master/rider-management/rider-management.module").then(m => m.RiderManagementModule) },
            { path : 'roles',                       loadChildren: () => import("./component/credential/role-management/roles.module").then(m => m.RolesModule) },
            { path : 'setting',                     loadChildren: () => import("./component/setting-management/setting.module").then(m => m.SettingModule) },
            { path : 'single-page',                 loadChildren: () => import("./component/single-page-management/single-page.module").then(m => m.SinglePageModule) },
            { path : 'scheduler-time',              loadChildren: () => import("./component/insurance/master/scheduler/scheduler.module").then(m => m.SchedulerModule) },
            { path : 'term-life-setup',             loadChildren: () => import("./component/insurance/master/term-life-product-setup/term-life-product.module").then(m => m.TermLifeProductSetupModule) },
            { path : 'underwriting-questionnaire',  loadChildren: () => import("./component/insurance/master/underwriting-questionnaire-management/underwriting-questionnaire.module").then(m => m.UnderwritingQuestionnaireModule) },
            { path : 'users',                       loadChildren: () => import("./component/credential/user-management/user.module").then(m => m.UserModule) },
            { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class AdminRoutingModule { }