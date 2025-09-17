import Head from 'next/head'

export default function ChecklioPrivacy() {
  return (
    <div className="min-h-screen bg-white text-[#222]">
      <Head>
        <title>Privacy Policy — Checklio Tasks</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Privacy Policy for Checklio Tasks (com.rudnex.checkliotasks)" />
      </Head>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy — Checklio Tasks</h1>
        <p className="text-sm text-[#555] mb-8">Last updated: <strong>September 17, 2025</strong></p>

        <p className="mb-6"><strong>Checklio Tasks</strong> (package: <code>com.rudnex.checkliotasks</code>) is an offline-first to-do and task manager app built with Flutter. This app was produced with assistance from an AI agent (Cursor).</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Summary</h2>
        <p className="mb-6">Checklio Tasks is designed to work fully offline. For core features the app does <strong>not</strong> collect, transmit, or store your personal data on remote servers. The app stores data locally on your device so you own your tasks, notes, and settings.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Data Collected &amp; How It’s Used</h2>
        <ul className="list-disc pl-6 space-y-3 mb-6">
          <li>
            <strong>Local app data:</strong> Tasks, notes, reminders, user preferences, and settings are stored <em>locally</em> on your device (SharedPreferences / SQLite) and are not uploaded anywhere by default.
          </li>
          <li>
            <strong>Permissions:</strong> The app asks for a small set of device permissions to enable features:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Notifications</strong> — to show local reminders and alarms.</li>
              <li><strong>Storage</strong> — for optional backups/restore or ringtone verification (all backups remain local unless you export them manually).</li>
              <li><strong>Exact Alarm / Alarm</strong> — to schedule precise reminders on supported Android versions.</li>
            </ul>
          </li>
          <li>
            <strong>No accounts / no sign-in:</strong> By default the app does not require any login or account creation. No email, name, or identifiers are collected unless you explicitly use a future feature that requires sign-in (e.g., cloud sync).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Third-party Services</h2>
        <p className="mb-4">Checklio Tasks aims to remain offline. However, the following third-party services may be included or added in the future:</p>
        <ul className="list-disc pl-6 space-y-3 mb-6">
          <li>
            <strong>Advertising (AdMob or similar)</strong> — If you enable ads, advertising SDKs may collect device identifiers (e.g., advertising ID) and other non-personal information for ad targeting and measurement. If your build includes ads, we will list the ad provider and link to their privacy policy in the app settings. If you do not want ads, please use the ad-free or premium build (if available).
          </li>
          <li>
            <strong>Optional Cloud Sync (future)</strong> — If you enable cloud sync (Firebase or other cloud providers), synced data will be stored on the chosen provider and subject to their privacy policies. You will be asked explicitly before enabling any cloud sync feature.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Analytics</h2>
        <p className="mb-6">By default Checklio Tasks does <strong>not</strong> collect analytics or crash reports. If analytics or crash reporting is added later, it will be clearly disclosed in-app and you may be given the option to opt-out.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">How long we keep data</h2>
        <p className="mb-6">All user content is stored locally and kept until you delete it or uninstall the app. Backup files created by you are stored where you choose (local export). The app does not purge data automatically except where a feature explicitly requests it and you confirm.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Security</h2>
        <p className="mb-6">Local data is stored using standard Android/iOS local storage mechanisms (SharedPreferences / SQLite). While we take reasonable steps to protect data, no local storage is 100% secure. If you enable device authentication features (PIN / biometric), the app can protect access to the UI (if enabled in Settings).</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Children</h2>
        <p className="mb-6">The app is not intended for use by children under 13. If you are a parent or guardian and believe your child provided personal information, contact us and we will work to remove that data from our systems (if stored remotely).</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Changes to this Policy</h2>
        <p className="mb-6">We may update this policy from time to time. If we introduce features that change the privacy model (e.g., cloud sync, analytics, or advertising), we will update this policy and provide notice in the app.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Contact</h2>
        <p className="mb-1">If you have questions, please contact: <strong>help@rudnex.com</strong></p>
        <p className="mb-12">Host / publisher: Rudnex</p>

        <p className="text-[#555] text-sm">This application was made with assistance from an AI agent (Cursor).</p>
      </main>
    </div>
  )
}


