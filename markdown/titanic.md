[← Back](../index.md)

# Titanic — Machine Learning from Disaster

> *Who survives? A machine learning answer to history's most famous shipwreck.*  
> [Kaggle Competition](https://www.kaggle.com/c/titanic)

---

## Goal

Build a model that predicts the **probability of passenger survival** based on features like age, class, sex, and fare.

---

## Models Evaluated

| Model | Type |
|-------|------|
| Logistic Regression | Linear |
| Gaussian Naive Bayes | Probabilistic |
| K-Nearest Neighbors | Instance-based |
| Linear SVM | Margin-based |
| **Random Forest** ✅ | Ensemble |

---

## Winner: Random Forest

> Multiple randomized decision trees vote together — reducing overfitting and boosting generalization.

---

## Results

| Metric | Score |
|--------|-------|
| Accuracy | ~80% |
| F1-Score | ~71% |
| ROC-AUC | ~82% |

> The model generalizes well with solid ROC-AUC performance. Further feature engineering could push accuracy higher.

---

## Stack

`Python` · `Scikit-learn` · `Pandas` · `Matplotlib` · `Seaborn`

🔗 [View full code on GitHub](https://github.com/cucu-o0/titanic)