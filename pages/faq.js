import { Collapse } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import illustration from "../assets/faq.svg"
import MainLayout from '../components/Layouts/MainLayout'
import RightIcon from '../components/icons/righticon'
import { useTranslation } from 'react-i18next'

const { Panel } = Collapse;


const FAQ = () => {
    const { t } = useTranslation();

    const text = "Contrairement à la croyance populaire, le Lorem Ipsum n'est pas un texte aléatoire, mais plutôt ses racines dans la littérature latine classique depuis 45 av. J.-C., ce qui lui donne plus de 2 000 ans. Le professeur Richard McClintock, professeur de latin à l'Université de Hampden-Sydney en Virginie, a recherché les origines d'un mot latin obscur dans le texte de Lorem Ipsum, 'consectetur', et, tout en retraçant ce mot dans la littérature latine, a découvert la source indiscutable. Il s'avère que les mots du texte de Lorem Ipsum proviennent des sections 1.10.32 et 1.10.33 du De Finibus Bonorum et Malorum de Cicéron, écrit en 45 av. Ce livre est un traité savant étendu sur la théorie morale, et était très populaire à la Renaissance. La première ligne de Lorem Ipsum 'Lorem ipsum dolor sit amet..' provient d'une ligne de la section 1.20.32 de ce livre."

    return (
        <MainLayout navbar>
            <div className='container px-5 mx-auto pb-24 pt-6 FAQ'>
                <div className='hidden md:flex justify-center align-middle text-center'>
                    <Image src={illustration} alt="illustration" className='w-full' />
                </div>
                <div className='mt-0'>
                    <div className='mt-0'>
                        <div className='flex gap-2 justify-center items-center py-4'>
                            <span>{t("Accueil")}</span> <RightIcon /> <Link className='text-[#0094DA]' href="/faq">{t("FAQ")}</Link>
                        </div>
                    </div>
                    <div className='text-center flex justify-center'>
                        <div className='max-w-[40%]'>
                            <h1 className='bigTitle'>{t("Nous sommes là pour vous aider")}</h1>
                            <p className='my-5 normalPara'>
                                {t("Parcourez les questions les plus fréquemment posées.")}
                            </p>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <Collapse expandIconPosition='right' ghost>
                            <Panel header={t("Comment puis-je m'inscrire à la plateforme ?")} key="1">
                                {t("faqText")}
                            </Panel>
                            <Panel header={t("Comment ajouter une page ?")} key="2">
                                {t("faqText")}
                            </Panel>
                            <Panel header={t("Quel type de pages peut-on ajouter ?")} key="3">
                                {t("faqText")}
                            </Panel>
                            <Panel header={t("L'inscription est-elle gratuite sur la plateforme ?")} key="4">
                                {t("faqText")}
                            </Panel>
                            <Panel header={t("Quel est le mécanisme de connexion ?")} key="5">
                                {t("faqText")}
                            </Panel>
                            <Panel header={t("Puis-je modifier mon compte ?")} key="6">
                                {t("faqText")}
                            </Panel>
                            <Panel header={t("Puis-je modifier la page que j'ai ajoutée ?")} key="7">
                                {t("faqText")}
                            </Panel>
                        </Collapse>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default FAQ
