import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité de OpexFood Restaurant",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
            <a href="/" className="hover:text-slate-900 transition">OpexFood</a>
            <ChevronRight size={16} />
            <span className="text-slate-900 font-medium">Politique de Confidentialité</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Politique de Confidentialité</h1>
          <p className="text-slate-600 mt-2">Dernière mise à jour : Mars 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-sm max-w-none text-slate-700">
          <section className="mb-12">
            <p className="text-lg leading-relaxed">
              Chez <span className="font-semibold text-slate-900">OpexFood</span>, nous prenons la protection de vos données très au sérieux. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles dans l'application OpexFood Restaurant.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-orange-600">1.</span> Informations que nous collectons
            </h2>
            <p className="mb-4">Pour vous offrir nos services et optimiser votre expérience, nous collectons les informations suivantes :</p>
            <ul className="space-y-3 ml-6">
              <li className="flex gap-3">
                <span className="text-orange-600 font-bold mt-1">•</span>
                <span><strong>Adresse e-mail</strong> : utilisée pour votre compte et vos communications</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-600 font-bold mt-1">•</span>
                <span><strong>Nom</strong> : pour personnaliser votre programme de fidélité</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-600 font-bold mt-1">•</span>
                <span><strong>Historique de visites</strong> : enregistrement des vos visites au restaurant pour le suivi du programme de fidélité</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-600 font-bold mt-1">•</span>
                <span><strong>Accès à la caméra</strong> : uniquement pour scanner les codes-barres de votre carte de fidélité (aucune image n'est stockée)</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-orange-600">2.</span> Utilisation de vos données
            </h2>
            <p className="mb-4">Vos données sont utilisées uniquement pour :</p>
            <ul className="space-y-3 ml-6">
              <li className="flex gap-3"><span className="text-orange-600 font-bold mt-1">•</span><span>Gérer votre compte et authentification</span></li>
              <li className="flex gap-3"><span className="text-orange-600 font-bold mt-1">•</span><span>Administrer votre programme de fidélité</span></li>
              <li className="flex gap-3"><span className="text-orange-600 font-bold mt-1">•</span><span>Vous envoyer des notifications et mises à jour importantes</span></li>
              <li className="flex gap-3"><span className="text-orange-600 font-bold mt-1">•</span><span>Améliorer et sécuriser nos services</span></li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-orange-600">3.</span> Sécurité de vos données
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
              <p className="text-slate-800">Vos données personnelles sont stockées de manière sécurisée sur les serveurs <strong>Supabase</strong>, une plateforme d'infrastructure réputée conforme aux normes internationales de sécurité des données. Nous utilisons le chiffrement et d'autres mesures de sécurité pour protéger vos informations contre l'accès non autorisé.</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-orange-600">4.</span> Partage de vos données
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
              <p className="text-slate-800"><strong className="text-green-700">Nous ne vendons jamais vos données</strong> à des tiers. Vos informations personnelles ne sont partagées qu'avec les services essentiels pour le fonctionnement de l'application (exemple : authentification).</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-orange-600">5.</span> Accès à la caméra
            </h2>
            <p className="mb-4">OpexFood Restaurant utilise l'accès à votre caméra <strong>uniquement</strong> pour scanner les codes-barres de votre carte de fidélité.</p>
            <ul className="space-y-3 ml-6">
              <li className="flex gap-3"><span className="text-orange-600 font-bold mt-1">✓</span><span><strong>Aucune image n'est stockée</strong> sur nos serveurs</span></li>
              <li className="flex gap-3"><span className="text-orange-600 font-bold mt-1">✓</span><span>Aucune photo ou vidéo n'est capturée ou conservée après le scan</span></li>
              <li className="flex gap-3"><span className="text-orange-600 font-bold mt-1">✓</span><span>Vous pouvez révoquer l'accès à la caméra à tout moment dans les paramètres de votre appareil</span></li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-orange-600">6.</span> Vos droits
            </h2>
            <p className="mb-4">Vous avez le droit de demander à tout moment :</p>
            <ul className="space-y-3 ml-6">
              <li className="flex gap-3"><span className="text-orange-600 font-bold mt-1">•</span><span>L'accès à vos données personnelles</span></li>
              <li className="flex gap-3"><span className="text-orange-600 font-bold mt-1">•</span><span>La correction de vos données</span></li>
              <li className="flex gap-3"><span className="text-orange-600 font-bold mt-1">•</span><span>La suppression de vos données personnelles</span></li>
              <li className="flex gap-3"><span className="text-orange-600 font-bold mt-1">•</span><span>Une copie de vos données dans un format lisible</span></li>
            </ul>
            <p className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-slate-800">
              Pour exercer ces droits, contactez-nous à l'adresse : <a href="mailto:pht001pro@gmail.com" className="font-semibold text-orange-600 hover:text-orange-700">pht001pro@gmail.com</a>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-orange-600">7.</span> Demande de suppression de compte
            </h2>
            <p className="mb-4">Si vous souhaitez supprimer entièrement votre compte et vos données personnelles, vous pouvez envoyer une demande à :</p>
            <div className="bg-slate-100 rounded-lg p-6 text-center mb-4">
              <p className="text-slate-900 font-semibold text-lg"><a href="mailto:pht001pro@gmail.com" className="text-orange-600 hover:text-orange-700">pht001pro@gmail.com</a></p>
              <p className="text-slate-600 text-sm mt-2">Mentionnez "Demande de suppression de compte" dans le sujet</p>
            </div>
            <p className="text-slate-600">Nous traiterons votre demande dans les 30 jours ouvrables et supprimerons complètement vos données.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-orange-600">8.</span> Nous contacter
            </h2>
            <div className="bg-slate-100 rounded-lg p-6">
              <p className="mb-4 text-slate-800">Pour toute question concernant cette politique de confidentialité ou vos données personnelles :</p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Application</p>
                  <p className="font-semibold text-slate-900">OpexFood Restaurant</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Entreprise</p>
                  <p className="font-semibold text-slate-900">OpexFood</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Email</p>
                  <p><a href="mailto:pht001pro@gmail.com" className="font-semibold text-orange-600 hover:text-orange-700">pht001pro@gmail.com</a></p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 pt-8 mt-12">
            <p className="text-sm text-slate-500">Cette politique de confidentialité est effective à partir de mars 2026. OpexFood se réserve le droit de mettre à jour cette politique à tout moment. Les modifications seront affichées sur cette page avec une date de mise à jour révisée.</p>
          </section>
        </div>
      </div>

      <div className="bg-slate-100 border-t border-slate-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-slate-700 mb-4">Des questions sur vos données ?</p>
            <a href="mailto:pht001pro@gmail.com" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition">Nous Contacter</a>
          </div>
        </div>
      </div>
    </div>
  );
}
