"use server";

import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs/server";

class UserNotFoundErr extends Error {}

export async function GetFormStats() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits ?? 0;
  const submissions = stats._sum.submissions ?? 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissionRate / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}

export async function GetForms() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const forms = await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return forms;
}

export async function GetFormById(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const form = await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });

  if (!form) {
    throw new Error(`form with id ${id} not found`);
  }

  const visits = form.visits ?? 0;
  const submissions = form.submissions ?? 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissionRate / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;
  const response = {
    ...form,
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };

  return response;
}

export async function CreateForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    throw new Error("Form Not Valid!");
  }

  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }
  const { name, description } = data;

  const newForm = await prisma.form.create({
    data: {
      userId: user.id,
      name,
      description,
    },
  });

  if (!newForm) {
    throw new Error("Something Went Wrong!!");
  }

  return newForm.id;
}

export async function UpdateFormContent(id: number, jsonContent: string) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const form = await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });

  if (!form) {
    throw new Error(`form with id ${id} not found`);
  }

  return await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}

export async function PublishForm(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const form = await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });

  if (!form) {
    throw new Error(`form with id ${id} not found`);
  }

  return await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      published: true,
    },
  });
}

export async function GetFormByFormURL(formUrl: string) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const form = await prisma.form.update({
    where: {
      shareURL: formUrl,
    },
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
  });

  if (!form) {
    throw new Error(`form with url ${formUrl} not found`);
  }
  return form;
}

export async function SubmitForm(formUrl: string, content: string) {
  return await prisma.form.update({
    where: {
      shareURL: formUrl,
      published: true,
    },
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmission: {
        create: {
          content,
        },
      },
    },
  });
}

export async function GetFormWithSubmission(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const form = await prisma.form.findUnique({
    where: {
      id,
      userId: user?.id,
    },
    include: {
      FormSubmission: true,
    },
  });

  if (!form) {
    throw new Error(`form with url ${id} not found`);
  }
  return form;
}
