'use client'

import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import FormContainer from '../form/FormContainer'
import { createReview } from '@/lib/actions'
import RatingInput from './RatingInput'
import TextArea from '../form/TextArea'
import { SubmitButton } from '../form/Buttons'

const SubmitReview = ({productId} : {productId: string}) => {
  const [isFormVisible, setFormVisible] = useState(false)
  const { user } = useUser()
  return (
    <div>
      <Button
        size={'lg'}
        className="capitalize mt-4"
        onClick={() => setFormVisible((prevState) => !prevState)}
      >
        {!isFormVisible ? 'leave a review' : 'close review input'}
      </Button>
      {isFormVisible && (
        <Card className="p-8 mt-8 ">
          <FormContainer action={createReview}>
            <input type="hidden" name="productId" value={productId} />
            <input type="hidden" name="authorName" value={user?.firstName || 'anonymous user'} />
            <input type="hidden" name="authorAvatar" value={user?.imageUrl} />
            <RatingInput name='rating' />
            <TextArea name='comment' label='feedback' />
            <SubmitButton className='mt-4'/>
          </FormContainer>
        </Card>
      )}
    </div>
  )
}
export default SubmitReview
