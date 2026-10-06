import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import pages from '@/data/pages.json'
import ContentInteractions from '@/components/content-interactions'
export const dynamicParams = false
export function generateStaticParams() { return Object.keys(pages).map(slug => ({ slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; return { title: ({ projects: 'Dự án', experience: 'Học tập & nghiên cứu', skills: 'Kỹ năng', books: 'Sách', certificates: 'Chứng chỉ', gallery: 'Ảnh', hobbies: 'Sở thích', schedule: 'Lịch học' } as Record<string, string>)[slug] || slug } }
export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params, content = (pages as Record<string, string>)[slug]
  if (!content) notFound()
  return <><main id="main-content" className={`content-page content-${slug}`} dangerouslySetInnerHTML={{ __html: content }} /><ContentInteractions page={slug} /></>
}
