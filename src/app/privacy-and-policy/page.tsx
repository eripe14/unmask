import React from 'react'
import { Footer } from '@/components/footer/Footer'

const ADMINISTRATOR_NAME = 'Karol Dronia'
const ADMINISTRATOR_ADDRESS = 'Będzin 42-506'
const RODO_CONTACT_EMAIL = 'karol.dronia@gmail.com'

const SUPABASE_REGION = 'eu-north1'
const SUPABASE_DATA_LOCATION = `EOG (region: ${SUPABASE_REGION})`

const PrivacyPolicy: React.FC = () => {
    return (
        <div>
            <div className="mx-auto max-w-4xl px-4 py-10 text-slate-700">
                <h1 className="mb-6 text-3xl font-bold text-primary">
                    Polityka Prywatności Serwisu unmask.kdronia.pl
                </h1>
                <p className="mb-8 text-sm text-slate-500">
                    Ostatnia aktualizacja: Listopad 2025 r.
                </p>

                <section className="mb-8">
                    <h2 className="mb-4 text-2xl font-semibold text-slate-800">
                        1. Informacje Ogólne
                    </h2>
                    <ul className="ml-6 list-disc space-y-3">
                        <li>
                            <strong>1.1. Administrator Danych Osobowych:</strong>
                            <p className="mt-1 text-sm">
                                Administratorem Danych Osobowych jest{' '}
                                <strong>{ADMINISTRATOR_NAME}</strong>, prowadzący Serwis internetowy
                                (dalej: &quot;Administrator&quot;).
                            </p>
                            <p className="mt-1 text-sm">
                                <strong>Adres korespondencyjny:</strong> {ADMINISTRATOR_ADDRESS}
                                <br />
                                <strong>Adres e-mail do kontaktu w sprawach RODO:</strong>{' '}
                                {RODO_CONTACT_EMAIL}
                            </p>
                        </li>
                        <li>
                            <strong>1.2. RODO:</strong> Rozporządzenie Parlamentu Europejskiego i
                            Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r.
                        </li>
                        <li>
                            <strong>1.3. Serwis:</strong> Serwis internetowy, dostępny pod adresem{' '}
                            <strong>https://unmask.kdronia.pl/</strong>.
                        </li>
                        <li>
                            <strong>1.4. Dane Osobowe:</strong> Oznaczają informacje o
                            zidentyfikowanej lub możliwej do zidentyfikowania osobie fizycznej
                            (Użytkowniku).
                        </li>
                        <li>
                            <strong>1.5. Użytkownik:</strong> Każda osoba fizyczna korzystająca z
                            Serwisu.
                        </li>
                    </ul>
                </section>

                <hr className="my-8" />
                <section className="mb-8">
                    <h2 className="mb-4 text-2xl font-semibold text-slate-800">
                        2. Dane Osobowe Przetwarzane w Serwisie
                    </h2>
                    <p className="mb-3">
                        W związku z korzystaniem z Serwisu, Administrator przetwarza dane osobowe,
                        które zbierane są przede wszystkim za pośrednictwem zewnętrznej usługi
                        uwierzytelniania <strong>Clerk</strong> oraz zapisywane w bazie danych{' '}
                        <strong>Supabase</strong>.
                    </p>

                    <h3 className="mb-2 mt-6 text-xl font-medium">
                        Dane zbierane podczas rejestracji/logowania (Clerk):
                    </h3>
                    <ul className="ml-6 list-disc space-y-1 text-sm">
                        <li>
                            <strong>Adres e-mail</strong> (wymagany do utworzenia i utrzymania
                            konta).
                        </li>
                        <li>
                            <strong>Unikalny identyfikator użytkownika (Clerk User ID)</strong>,
                            służący do powiązania aktywności w bazie Supabase.
                        </li>
                        <li>
                            <strong>Opcjonalnie:</strong> publicznie dostępna nazwa użytkownika lub
                            zdjęcie profilowe, jeśli logowanie odbywa się za pomocą zewnętrznych
                            dostawców (np. Google).
                        </li>
                    </ul>

                    <h3 className="mb-2 mt-6 text-xl font-medium">
                        Dane generowane w trakcie korzystania z Serwisu:
                    </h3>
                    <ul className="ml-6 list-disc space-y-1 text-sm">
                        <li>
                            <strong>Wyniki testów:</strong> przesłane teksty, wynik analizy
                            AI-lookalike oraz metryki (np. TTR, N-gramy), powiązane z kontem
                            Użytkownika.
                        </li>
                        <li>
                            <strong>Logi systemowe:</strong> adres IP, data i czas dostępu,
                            informacje o przeglądarce i systemie operacyjnym (przetwarzane w celach
                            technicznych i bezpieczeństwa).
                        </li>
                    </ul>
                </section>

                <hr className="my-8" />

                <section className="mb-8">
                    <h2 className="mb-4 text-2xl font-semibold text-slate-800">
                        3. Cele i Podstawy Prawne Przetwarzania Danych
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium uppercase text-slate-500">
                                        Cel przetwarzania
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium uppercase text-slate-500">
                                        Podstawa Prawna (RODO)
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium uppercase text-slate-500">
                                        Uzasadnienie
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                <tr>
                                    <td className="whitespace-nowrap px-3 py-2 text-sm font-medium">
                                        Utworzenie i utrzymanie konta
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-2 text-sm">
                                        Art. 6 ust. 1 lit. b)
                                    </td>
                                    <td className="px-3 py-2 text-sm">
                                        <strong>Wykonanie umowy</strong> o świadczenie usług drogą
                                        elektroniczną.
                                    </td>
                                </tr>
                                <tr>
                                    <td className="whitespace-nowrap px-3 py-2 text-sm font-medium">
                                        Przechowywanie wyników testów
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-2 text-sm">
                                        Art. 6 ust. 1 lit. b)
                                    </td>
                                    <td className="px-3 py-2 text-sm">
                                        <strong>Wykonanie umowy</strong> (udostępnianie
                                        Użytkownikowi historii jego działań).
                                    </td>
                                </tr>
                                <tr>
                                    <td className="whitespace-nowrap px-3 py-2 text-sm font-medium">
                                        Prowadzenie anonimowych statystyk
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-2 text-sm">
                                        Art. 6 ust. 1 lit. f)
                                    </td>
                                    <td className="px-3 py-2 text-sm">
                                        <strong>Prawnie uzasadniony interes</strong> Administratora,
                                        polegający na prowadzeniu badań i prezentowaniu wyników w
                                        formie zagregowanej.
                                    </td>
                                </tr>
                                <tr>
                                    <td className="whitespace-nowrap px-3 py-2 text-sm font-medium">
                                        Zapewnienie bezpieczeństwa Serwisu
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-2 text-sm">
                                        Art. 6 ust. 1 lit. f)
                                    </td>
                                    <td className="px-3 py-2 text-sm">
                                        <strong>Prawnie uzasadniony interes</strong> (monitorowanie,
                                        utrzymanie stabilności i zapobieganie nadużyciom).
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <hr className="my-8" />

                <section className="mb-8">
                    <h2 className="mb-4 text-2xl font-semibold text-slate-800">
                        4. Odbiorcy Danych i Przekazywanie poza EOG
                    </h2>

                    <h3 className="mb-2 mt-6 text-xl font-medium">
                        Podmioty Przetwarzające (Procesorzy):
                    </h3>
                    <ul className="ml-6 list-disc space-y-1 text-sm">
                        <li>
                            <strong>Clerk (Clerk, Inc.)</strong>: usługa zarządzania kontami i
                            uwierzytelniania.
                        </li>
                        <li>
                            <strong>Supabase</strong>: dostawca bazy danych i funkcji backendowych
                            (przechowywanie danych Serwisu), z konfiguracją hostingu w regionie:{' '}
                            <strong>{SUPABASE_DATA_LOCATION}</strong>.
                        </li>
                    </ul>

                    <h3 className="mb-2 mt-6 text-xl font-medium">Przekazywanie danych</h3>
                    <div className="space-y-3 text-sm">
                        <p>
                            <strong>Supabase:</strong> dane Serwisu (w tym dane konta i wyniki) są
                            przechowywane w ramach Europejskiego Obszaru Gospodarczego zgodnie z
                            konfiguracją projektu (<strong>{SUPABASE_DATA_LOCATION}</strong>).
                        </p>
                        <p>
                            <strong>Clerk:</strong> dostawca uwierzytelniania może przetwarzać dane
                            (np. e-mail, identyfikatory) również poza EOG, w tym w USA — zależnie od
                            infrastruktury i podwykonawców dostawcy. W takim przypadku przekazywanie
                            odbywa się na podstawie odpowiednich mechanizmów prawnych, w
                            szczególności <strong>Standardowych Klauzul Umownych (SCC)</strong>{' '}
                            oraz/lub innych dopuszczalnych podstaw transferu stosowanych przez
                            dostawcę.
                        </p>
                        <p className="text-slate-500">
                            Uwaga: Jeżeli Użytkownik korzysta z logowania zewnętrznego (np. Google),
                            odpowiedni dostawca może przetwarzać dane zgodnie ze swoimi politykami
                            prywatności.
                        </p>
                    </div>
                </section>

                <hr className="my-8" />

                <section className="mb-8">
                    <h2 className="mb-4 text-2xl font-semibold text-slate-800">
                        5. Okres Przechowywania Danych
                    </h2>
                    <ul className="ml-6 list-disc space-y-1 text-sm">
                        <li>
                            <strong>Dane konta (E-mail, User ID):</strong> przechowywane są do
                            momentu zażądania przez Użytkownika usunięcia konta.
                        </li>
                        <li>
                            <strong>Wyniki testów:</strong> przechowywane są do momentu usunięcia
                            konta Użytkownika. Po usunięciu konta wyniki mogą zostać{' '}
                            <strong>zminimalizowane i przechowywane w formie zagregowanej</strong>{' '}
                            (bez powiązania z kontem) wyłącznie w celach statystycznych.
                        </li>
                        <li>
                            <strong>Logi systemowe:</strong> przez okres niezbędny do celów
                            technicznych i bezpieczeństwa, zazwyczaj 30 dni.
                        </li>
                    </ul>
                </section>

                <hr className="my-8" />

                <section className="mb-8">
                    <h2 className="mb-4 text-2xl font-semibold text-slate-800">
                        6. Prawa Użytkownika (RODO)
                    </h2>
                    <p className="mb-3">
                        Użytkownikowi przysługuje prawo do żądania od Administratora dostępu do
                        danych osobowych, ich sprostowania, usunięcia lub ograniczenia
                        przetwarzania, a także prawo do wniesienia sprzeciwu wobec przetwarzania
                        oraz prawo do przenoszenia danych.
                    </p>
                    <p className="mb-3 font-medium">W szczególności:</p>
                    <ul className="ml-6 list-disc space-y-1 text-sm">
                        <li>
                            <strong>Prawo do usunięcia konta (Prawo do bycia zapomnianym):</strong>{' '}
                            Użytkownik może w każdej chwili zażądać usunięcia swojego konta. Żądanie
                            to skutkuje usunięciem danych osobowych z Serwisu oraz — w granicach
                            technicznych i prawnych — z systemów podmiotów przetwarzających (np.
                            Clerk, Supabase).
                        </li>
                        <li>
                            <strong>Skarga:</strong> Użytkownikowi przysługuje prawo wniesienia
                            skargi do{' '}
                            <strong>Prezesa Urzędu Ochrony Danych Osobowych (PUODO)</strong>.
                        </li>
                    </ul>
                    <p className="mt-4 text-sm">
                        W celu realizacji swoich praw, prosimy o kontakt z Administratorem pod
                        adresem e-mail: <strong>{RODO_CONTACT_EMAIL}</strong>.
                    </p>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default PrivacyPolicy
