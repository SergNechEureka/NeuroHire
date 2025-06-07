# Q&A Session

## Questions and Answers

1. Q: The task mentions three languages (en, ru, de) - should we keep all three or adjust based on current project needs?
   A: Yes, keep all three languages.

2. Q: I notice there's already an ApplicationBar.tsx - should we:
   - Integrate it into the new layout system
   - Replace it completely
   - Keep it separate for specific purposes?
   A: No, Layout should not use anything from existing components. It should be self-contained and independent, so it could be used in another application.

3. Q: The project seems to have some existing components and structure. Should we:
   - Build on top of existing components
   - Create a completely new structure
   - Or take a hybrid approach?
   A: Do not use anything from existing components unless specifically instructed to do so.

4. Q: For the Dashboard component that will show after login:
   - Should it be part of the MainLayout structure
   - Or should it be a separate route that uses MainLayout?
   A: Ask this question when we reach the corresponding step.

5. Q: The task mentions CandidatesTable integration in the Dashboard:
   - Is this component already implemented
   - Or should we create it as part of this task?
   A: Ask this question when we reach the corresponding step. 